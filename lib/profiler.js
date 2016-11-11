const { Cc, Ci, Cu } = require("chrome");
Cu.import("resource://gre/modules/Services.jsm");

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

function addIsRunningObserver(fun) {
  isRunningObserver.addObserver(fun);
}

function removeIsRunningObserver(fun) {
  isRunningObserver.removeObserver(fun);
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


const isRunningObserver = {
  _observers: new Set(),
  _isListening: false,

  observe: function (aSubject, aTopic, aData) {
    switch (aTopic) {
      case "profiler-started":
      case "profiler-stopped": {
        // Call observer(false) or observer(true), but do it through a promise
        // so that it's asynchronous.
        // We don't want it to be synchronous because of the observer call in
        // addObserver, which is asynchronous, and we want to get the ordering
        // right.
        const isRunningPromise = Promise.resolve(aTopic === "profiler-started");
        for (observer of this._observers) {
          isRunningPromise.then(observer);
        }
      }
      default:
    }
  },

  _startListening: function () {
    if (!this._isListening) {
      this._isListening = true;
      Services.obs.addObserver(this, "profiler-started", false);
      Services.obs.addObserver(this, "profiler-stopped", false);
    }
  },

  _stopListening: function () {
    if (this._isListening) {
      this._isListening = false;
      Services.obs.removeObserver(this, "profiler-started", false);
      Services.obs.removeObserver(this, "profiler-stopped", false);
    }
  },

  addObserver: function(observer) {
    this._startListening();
    this._observers.add(observer);
    isRunning().then(observer);
  },

  removeObserver: function(observer) {
    this._observers.delete(observer);
    if (this._observers.size === 0) {
      this._stopListening();
    }
  }
};

exports.start = startProfiler;
exports.stop = stopProfiler;
exports.isRunning = isRunning;
exports.addIsRunningObserver = addIsRunningObserver;
exports.removeIsRunningObserver = removeIsRunningObserver;
exports.getProfile = getProfile;
exports.getSharedLibraryInformation = getSharedLibraryInformation;
exports.platform = {
  platform: getPlatform(),
  arch: getArch()
};
