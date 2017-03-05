const { Cu } = require('chrome');
const { parseSym } = require('lib/parse-sym');
const { dumpSyms } = require('lib/dump-syms');
const { getSymbolsFromNM } = require('lib/nm-syms');
const fxprefs = require("sdk/preferences/service");
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

function urlForSymFile(pdbName, breakpadId) {
  let symName = pdbName;
  if (pdbName.endsWith('.pdb')) {
    symName = pdbName.substr(0, pdbName.length - 4);
  }
  return `http://symbols.mozilla.org/${pdbName}/${breakpadId}/${symName}.sym`;
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
function getSymbols(pdbName, breakpadId, path, platform, arch) {
  let cachedInfo = getCachedInfo(pdbName, breakpadId);
  if (cachedInfo) {
    path = cachedInfo.path;
    platform = cachedInfo.platform;
    arch = cachedInfo.arch;
  }
  return logPromise(
    `requesting symbols for library ${pdbName} ${breakpadId} from the symbol server`,
    getSymbolDumpFromSymbolServer(pdbName, breakpadId)
  ).catch(() => {
    if (!path || !(path.includes('/') || path.includes('\\'))) {
      throw new Error(`Don't know where library ${pdbName} ${breakpadId} is stored.`);
    }
    return logPromise(
      `dumping symbols for library ${pdbName} ${breakpadId} located at ${path}`,
      getSymbolDumpByDumpingLocalFile(path, platform, arch)
    );
  }).then(symbolDump => logPromise(
    `parsing symbol file for library ${pdbName} ${breakpadId}`,
    parseSym(symbolDump)
  )).catch(error => {
    if (platform === 'linux') {
      // dump_syms failed, fall back to nm:
      return getSymbolsFromNM(path);
    }
    throw error;
  });
}

let _cache = new Map();

function getCachedInfo(pdbName, breakpadId) {
  return _cache.get(urlForSymFile(pdbName, breakpadId));
}

function prime(libs, profilerPlatform) {
  let { platform, arch } = profilerPlatform;
  libs.forEach(lib => {
    let { pdbName, breakpadId, name: path } = lib;
    _cache.set(urlForSymFile(pdbName, breakpadId), {pdbName, breakpadId, path, platform, arch});
  });
}

exports.getSymbols = getSymbols;
exports.prime = prime;
