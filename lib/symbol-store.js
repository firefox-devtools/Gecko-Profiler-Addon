const { Cu } = require('chrome');
const { parseSym } = require('lib/parse-sym');
const { dumpSyms } = require('lib/dump-syms');
const { getSymbolsFromNM } = require('lib/nm-syms');
const fxprefs = require("sdk/preferences/service");
Cu.importGlobalProperties(['XMLHttpRequest', 'Blob', 'TextDecoder', 'FileReader']);

function debugSymbolStore() {
  return fxprefs.get("profiler.debug-symbol-store", false);
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
  if (debugSymbolStore()) {
    dump(`dumping binary at ${path}\n`);
  }
  return dumpSyms(path, null, platform, arch);
}

/**
 * Returns a promise of the contents of a symbol dump for the requested
 * library, either as a Blob or as a Uint8Array. Tries to get the dump
 * from the mozilla symbol server first. If the connection fails or the
 * symbol server doesn't have symbols for the requested library, the local
 * binary is processed and the symbols are dumped.
 * @param  string pdbName    The library's pdbName.
 * @param  string breakpadId The library's breakpadId.
 * @param  string path       The path to the library on the local file system.
 * @param  string platform   The platform that the library was compiled for.
 * @param  string arch       The library's architecture, only needed if platform is "mac".
 * @return promise           The symbol dump.
 */
function getSymFile(pdbName, breakpadId, path, platform, arch) {
  return new Promise((resolve, reject) => {
    getSymbolDumpFromSymbolServer(pdbName, breakpadId).then(resolve, error => {
      if (debugSymbolStore()) {
        dump(`getting the symbols from the symbol server for library ${pdbName} ${breakpadId} failed:\n`);
        dump(error.toSource() + '\n');
      }
      if (!path || !(path.includes('/') || path.includes('\\'))) {
        reject(new Error(`Don't know where library ${pdbName} ${breakpadId} is stored.`));
        return;
      }
      getSymbolDumpByDumpingLocalFile(path, platform, arch).then(resolve, reject);
    });
  });
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
  return getSymFile(pdbName, breakpadId, path, platform, arch).then(symbolDump => {
    if (debugSymbolStore()) {
      dump(`received symbol dump for ${pdbName} ${breakpadId}\n`);
    }
    return parseSym(symbolDump);
  }).catch(error => {
    if (platform === 'linux') {
      // dump_syms failed, fall back to nm:
      return getSymbolsFromNM(path);
    }
    throw error;
  }).then(symbolTable => {
    if (debugSymbolStore()) {
      dump(`parsed symbol dump for ${pdbName} ${breakpadId}\n`);
    }
    return symbolTable;
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
