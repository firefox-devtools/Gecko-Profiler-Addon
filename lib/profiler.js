const { Cc, Ci, Cu } = require("chrome");

function getPlatform() {
  let platform = Cc["@mozilla.org/network/protocol;1?name=http"].getService(Ci.nsIHttpProtocolHandler).platform.toLowerCase();
  if (platform == 'macintosh') {
    return 'mac';
  }
  return platform;
}

function getArch() {
  let abi = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULRuntime).XPCOMABI;
  if (abi == 'x86_64-gcc3') {
    return 'x86_64';
  }
  return abi;
}

function profiler() {
  if (!profiler.cachedProfiler) {
    profiler.cachedProfiler = Cc["@mozilla.org/tools/profiler;1"].getService(Ci.nsIProfiler);
  }
  return profiler.cachedProfiler;
}

function startProfiler(entries, interval, features, threads) {
  return new Promise((resolve, reject) => {
    if (threads.length) {
      try {
        profiler().StartProfiler(entries, interval, features, features.length, threads, threads.length);
        resolve();
        return;
      } catch (e) {
      }
    }
    profiler().StartProfiler(entries, interval, features, features.length);
    resolve();
  });
}

function stopProfiler() {
  return new Promise((resolve, reject) => {
    profiler().StopProfiler();
    resolve();
  });
}

function isRunning() {
  return Promise.resolve(profiler().IsActive());
}

function getProfile() {
  if (profiler().getProfileDataAsync) {
    return profiler().getProfileDataAsync();
  }
  // No luck - synchronous it is.
  return Promise.resolve(profiler().getProfileData());
}

function getSharedLibraryInformation() {
  let json = JSON.parse(profiler().getSharedLibraryInformation());
  return Promise.resolve(json.map(lib => {
    let pdbName, breakpadId;
    if ('breakpadId' in lib) {
      pdbName = lib.name.substr(lib.name.lastIndexOf("/") + 1);
      breakpadId = lib.breakpadId;
    } else {
      pdbName = lib.pdbName;
      let pdbSig = lib.pdbSignature.replace(/[{}-]/g, "").toUpperCase();
      breakpadId = pdbSig + lib.pdbAge;
    }
    return Object.assign({}, lib, {pdbName, breakpadId});
  }));
}

exports.start = startProfiler;
exports.stop = stopProfiler;
exports.isRunning = isRunning;
exports.getProfile = getProfile;
exports.getSharedLibraryInformation = getSharedLibraryInformation;
exports.platform = {
  platform: getPlatform(),
  arch: getArch()
};
