function listClientTabs(client) {
  return new Promise((resolve, reject) => {
    client.listTabs(response => {
      if (!response.error) {
        resolve(response);
      } else {
        reject(response.error + ': ' + response.message);
      }
    });
  });
}

async function profilerForClient(client) {
  const profilerActor = (await listClientTabs(client)).tabs[0].profilerActor;

  function request(msgName, args = {}) {
    return new Promise((resolve, reject) => {
      const msg = Object.assign({ to: profilerActor, type: msgName }, args);
      // console.log('request:', msg);
      client.request(msg, response => {
        // console.log(msgName + ' response:', response);
        if (!response.error) {
          resolve(response);
        } else {
          reject(response.error + ': ' + response.message);
        }
      });
    });
  }

  function startProfiler(entries, interval, features, threads) {
    // Requesting stackwalk seems to crash non-nightly Firefox for Android builds...
    const featuresWithoutStackWalk = features.filter(f => f !== 'stackwalk');
    return request('startProfiler', {
      entries,
      interval,
      features: featuresWithoutStackWalk,
      threadFilters: threads
    });
  }

  function stopProfiler() {
    return request('stopProfiler');
  }

  function pauseProfiler() {
    return Promise.reject(new Error('pausing and resuming is not implemented by the ProfilerActor'));
  }

  function resumeProfiler() {
    return Promise.reject(new Error('pausing and resuming is not implemented by the ProfilerActor'));
  }

  function addIsRunningObserver(fun) {
    isRunningObserver.addObserver(fun);
  }

  function removeIsRunningObserver(fun) {
    isRunningObserver.removeObserver(fun);
  }

  async function isRunning() {
    return (await request('isActive')).isActive;
  }

  let randomLibs = null;

  async function getProfile() {
    const profile = (await request('getProfile')).profile;
    randomLibs = JSON.parse(JSON.stringify(profile.libs));
    return profile;
  }

  async function getSharedLibraryInformation() {
    try {
      // This is broken at the moment, see bug 1350503.
      // return (await request('sharedLibraries')).sharedLibraries;
    } catch (e) { }

    // If sharedLibraries does not exist, then we're connected to a
    // pre-bug 1329111 build and need to massage the data a little so that it
    // has the shape that we need.

    let sli;
    try {
      sli = (await request('getSharedLibraryInformation')).sharedLibraryInformation;
    } catch (e) {
      if (randomLibs) {
        return randomLibs;
      }
      return (await getProfile()).libs;
    }
    let json = JSON.parse(sli);
    return json.map(lib => {
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
      const arch = lib.arch || 'arm';
      return Object.assign({}, lib, { debugName, breakpadId, path, arch });
    });
  }

  const isRunningObserver = {
    _observers: new Set(),

    addObserver: function(observer) {
      this._observers.add(observer);
      isRunning().then(observer);
    },

    removeObserver: function(observer) {
      this._observers.delete(observer);
    }
  };

  return {
    start: startProfiler,
    stop: stopProfiler,
    pause: pauseProfiler,
    resume: resumeProfiler,
    isRunning: isRunning,
    addIsRunningObserver: addIsRunningObserver,
    removeIsRunningObserver: removeIsRunningObserver,
    getProfile: getProfile,
    getSharedLibraryInformation: getSharedLibraryInformation,
    platform: {
      platform: 'Android',
      arch: 'arm'
    },
  };
}

exports.profilerForClient = profilerForClient;
