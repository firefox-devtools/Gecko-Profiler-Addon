const { Cc, Ci, Cu } = require("chrome");
const system = require('sdk/system');
const fxprefs = require("sdk/preferences/service");
Cu.import("resource://gre/modules/Services.jsm");
const kAsyncStackPrefName = "javascript.options.asyncstack";
let gAsyncStacksWereEnabled = false;

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
    gAsyncStacksWereEnabled = fxprefs.get(kAsyncStackPrefName, false);
    fxprefs.set(kAsyncStackPrefName, false);
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
    fxprefs.set(kAsyncStackPrefName, gAsyncStacksWereEnabled);
    profiler().StopProfiler();
    resolve();
  });
}

function pauseProfiler() {
  profiler().PauseSampling();
}

function resumeProfiler() {
  profiler().ResumeSampling();
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
  if (!profiler().IsActive()) {
    return Promise.reject(new Error("The profiler is stopped. " +
      "You need to start the profiler before you can capture a profile."));
  }
  if (profiler().getProfileDataAsync) {
    return profiler().getProfileDataAsync();
  }
  // No luck - synchronous it is.
  return Promise.resolve(profiler().getProfileData());
}

function getSharedLibraryInformation() {
  if ('sharedLibraries' in profiler()) {
    return Promise.resolve(profiler().sharedLibraries);
  }

  // If profiler().sharedLibraries does not exist, then we're in a
  // pre-bug 1329111 build and need to massage the data a little so that it
  // has the shape that we need.

  // Sanity check
  if (!('getSharedLibraryInformation' in profiler())) {
    return Promise.reject(new Error('Cannot find shared library information'));
  }

  const sli = profiler().getSharedLibraryInformation();
  let json = JSON.parse(sli);
  return Promise.resolve(json.map(lib => {
    let debugName, breakpadId;
    if ('breakpadId' in lib) {
      debugName = lib.name.substr(lib.name.lastIndexOf("/") + 1);
      breakpadId = lib.breakpadId;
    } else {
      debugName = lib.pdbName;
      let pdbSig = lib.pdbSignature.replace(/[{}-]/g, "").toUpperCase();
      breakpadId = pdbSig + lib.pdbAge;
    }
    // Before bug 1329111, the path was in the 'name' property on macOS and
    // Linux, and unobtainable on Windows.
    const path = lib.path || lib.name;
    const arch = lib.arch || getArch();
    return Object.assign({}, lib, { debugName, breakpadId, path, arch });
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
exports.pause = pauseProfiler;
exports.resume = resumeProfiler;
exports.isRunning = isRunning;
exports.addIsRunningObserver = addIsRunningObserver;
exports.removeIsRunningObserver = removeIsRunningObserver;
exports.getProfile = getProfile;
exports.getSharedLibraryInformation = getSharedLibraryInformation;
exports.platform = {
  platform: system.platform,
  arch: getArch()
};
