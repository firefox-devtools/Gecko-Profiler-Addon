const { Cu } = require('chrome');
const { parseSym } = require('lib/parse-sym');
const { dumpSyms } = require('lib/dump-syms');
const { getSymbolsFromNM } = require('lib/nm-syms');
const fxprefs = require("sdk/preferences/service");
const { OS } = Cu.import("resource://gre/modules/osfile.jsm", {});
Cu.importGlobalProperties(['XMLHttpRequest', 'Blob', 'TextDecoder', 'FileReader']);

function debugSymbolStore() {
  return fxprefs.get("profiler.debug-symbol-store", false);
}

function logPromise(description, promise) {
  if (!debugSymbolStore()) {
    return promise;
  }

  dump(`[starting] ${description}\n`);
  return promise.then(result => {
    dump(`[success] ${description}\n`);
    return result;
  }, error => {
    dump(`[failure] ${description}\n`);
    dump(error.toSource() + '\n');
    throw error;
  });
}

function pathComponentsForSymbolFile(pdbName, breakpadId) {
  let symName = pdbName;
  if (pdbName.endsWith('.pdb')) {
    symName = pdbName.substr(0, pdbName.length - 4);
  }
  return [pdbName, breakpadId, symName + '.sym'];
}

function getContainingObjdirDist(path) {
  let curPath = path;
  let curPathBasename = OS.Path.basename(curPath);
  while (curPathBasename) {
    if (curPathBasename === 'dist') {
      return curPath;
    }
    const parentDirPath = OS.Path.dirname(curPath);
    if (curPathBasename === 'bin') {
      return parentDirPath;
    }
    curPath = parentDirPath;
    curPathBasename = OS.Path.basename(curPath);
  }
  return null;
}

function filePathForSymFileInObjDir(binaryPath, pdbName, breakpadId) {
  // `mach buildsymbols` generates symbol files located
  // at /path/to/objdir/dist/crashreporter-symbols/.
  const objDirDist = getContainingObjdirDist(binaryPath);
  if (!objDirDist) {
    return null;
  }
  return OS.Path.join(...[
    objDirDist, 'crashreporter-symbols',
    ...pathComponentsForSymbolFile(pdbName, breakpadId)]);
}

function getSymbolsFromExistingDumpInObjDir(path, pdbName, breakpadId) {
  return Promise.resolve().then(() => {
    const symFilePath = filePathForSymFileInObjDir(path, pdbName, breakpadId);
    if (symFilePath === null) {
      throw new Error(`Didn't detect whether ${pdbName} ${breakpadId} is in an objdir (path: ${path})`);
    }
    if (debugSymbolStore()) {
      dump(`attempting to read sym file for library ${pdbName} ${breakpadId} at ${symFilePath}\n`);
    }
    return OS.File.read(symFilePath);
  });
}

function urlForSymFile(pdbName, breakpadId) {
  return 'http://symbols.mozilla.org/' +
    pathComponentsForSymbolFile(pdbName, breakpadId).join('/');
}

function getSymbolDumpFromSymbolServer(pdbName, breakpadId) {
  const url = urlForSymFile(pdbName, breakpadId);
  if (debugSymbolStore()) {
    dump(`fetching symbol dump for library ${pdbName} ${breakpadId} from ${url}\n`);
  }
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      if (request.status != 200) {
        reject(new Error(`got error status ${request.status}`));
      } else {
        resolve(new Uint8Array(request.response));
      }
    };
    request.onerror = reject;
    request.send();
  });
}

function getSymbolDumpByDumpingLocalFile(path, platform, arch) {
  return dumpSyms(path, null, platform, arch);
}

/**
 * Gets the symbols for a library, in the form [addrs, syms], with addrs being
 * a Uint32Array of addresses, in ascending order, and syms being an array of
 * strings carrying the symbol for each address.
 * @param  string pdbName    The library's pdbName.
 * @param  string breakpadId The library's breakpadId.
 * @param  string path       The path to the library on the local file system.
 * @param  string platform   The platform that the library was compiled for.
 * @param  string arch       The library's architecture, only needed if platform is "mac".
 * @return promise           The addresses and associated symbols.
 */
async function getSymbols(pdbName, breakpadId, path, platform, arch) {
  let cachedInfo = getCachedInfo(pdbName, breakpadId);
  if (cachedInfo) {
    path = cachedInfo.path;
    platform = cachedInfo.platform;
    arch = cachedInfo.arch;
  }

  // We have multiple options for obtaining symbol information for the given
  // binary. We try them in sequence, starting with those that are cheapest
  // and most likely to succeed.
  //  (1) Using existing symbol dumps stored in the object directory of a local
  //      Firefox build, generated using `mach buildsymbols` [requires path]
  //  (2) Using symbol dumps from the Mozilla symbol server [only requires
  //      pdbName + breakpadId]
  //  (3) Using the command line tool `nm` [linux only, requires path]
  //  (4) Using the tool dump_syms [mac + linux only, requires path]
  //
  // Each of these options can go wrong for a variety of reasons, so on failure
  // we will try the next one.
  // (1) will fail if this is not a local build that's running from the object
  // directory or if the user hasn't run `mach buildsymbols` on it.
  // (2) will fail if this is not an official mozilla build (e.g. Nightly) or a
  // known system library.
  // (3) will fail on non-Linux or if `nm` is not available.
  // (4) will fail on platforms other than Mac or Linux, or if the binary is
  // very large. For example, libxul.so on Linux with debug information is
  // usually too large (> 1GB).
  const haveAbsolutePath = path && OS.Path.split(path).absolute;
  try {
    // (1) Try to find existing symbol dumps in the build's object directory.
    if (!haveAbsolutePath) {
      throw new Error('Cannot find local dumps unless absolute path to the binary is known.');
    }
    const symbolDump = await logPromise(
      `reading existing symbol dump for library ${pdbName} ${breakpadId} from the objdir`,
      getSymbolsFromExistingDumpInObjDir(path, pdbName, breakpadId)
    );
    return await logPromise(
      `parsing symbol file for library ${pdbName} ${breakpadId} obtained from existing symbol dump`,
      parseSym(symbolDump)
    );
  } catch (error) {
    try {
      // (2) Try to obtain a symbol dump from the Mozilla symbol server.
      const symbolDump = await logPromise(
        `requesting symbols for library ${pdbName} ${breakpadId} from the symbol server`,
        getSymbolDumpFromSymbolServer(pdbName, breakpadId)
      );
      return await logPromise(
        `parsing symbol file for library ${pdbName} ${breakpadId} obtained from the symbol server`,
        parseSym(symbolDump)
      );
    } catch (error) {
      if (!haveAbsolutePath) {
        throw new Error(`Cannot dump symbols from library ${pdbName} ${breakpadId} because the absolute path to the binary is not known.`);
      }
      try {
        // (3) Use `nm` to obtain symbols.
        if (platform !== 'linux') {
          throw new Error('Can only use `nm` on Linux.');
        }
        // `getSymbolsFromNM` has the parsing step built in; it doesn't go
        // through the intermediary .sym format.
        return await logPromise(
          `dumping symbols for library ${pdbName} ${breakpadId} located at ${path} using nm`,
          getSymbolsFromNM(path)
        );
      } catch (error) {
        // (4) Run dump_syms to obtain a symbol dump.
        const symbolDump = await logPromise(
          `dumping symbols for library ${pdbName} ${breakpadId} located at ${path} using dump_syms`,
          getSymbolDumpByDumpingLocalFile(path, platform, arch)
        );
        return await logPromise(
          `parsing symbol file for library ${pdbName} ${breakpadId} obtained from dump_syms`,
          parseSym(symbolDump)
        );
      }
    }
  }
}

let _cache = new Map();

function getCachedInfo(pdbName, breakpadId) {
  return _cache.get(urlForSymFile(pdbName, breakpadId));
}

function prime(libs, profilerPlatform) {
  let { platform, arch } = profilerPlatform;
  libs.forEach(lib => {
    const { pdbName, breakpadId, path } = lib;
    _cache.set(urlForSymFile(pdbName, breakpadId), {pdbName, breakpadId, path, platform, arch});
  });
}

exports.getSymbols = getSymbols;
exports.prime = prime;
