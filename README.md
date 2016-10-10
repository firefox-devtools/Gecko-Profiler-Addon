#Gecko Profiler

This is the `for-cleopatra-react` branch.

This is where I'm attempting a rewrite of the existing Gecko Profiler addon, developed in conjunction with the new [`cleopatra-react` branch of cleopatra](https://github.com/mstange/cleopatra/tree/cleopatra-react).

##Usage

Make sure you have somewhat recent versions of node and npm installed. Then:

```bash
$ git clone -b for-cleopatra-react https://github.com/mstange/Gecko-Profiler-Addon/
$ cd Gecko-Profiler-Addon/
$ npm install                 # installs jpm
$ npm run start-mac-nightly   # runs jpm --binary /Applications/FirefoxNightly.app
```

The addon does not have any kind of UI at the moment. The profiler is automatically started on startup. You can control it with two keyboard shortcuts:

 - <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>5</kbd>: Stop / Restart profiling
 - <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>6</kbd>: Capture the profile. This captures the current contents of the profiler buffer, opens a tab with cleopatra at `http://localhost:4242/`, and sends the profile to it.

You need to have cleopatra running at `http://localhost:4242/`, as described in [cleopatra's README](https://github.com/mstange/cleopatra/tree/cleopatra-react#running).

##Known issues

 - Symbolication apparently only works on macOS at the moment.
 - Crashes Firefox on Linux in non-`--enable-profiling` builds. (Steve Fink promised me a bug report for this one.)
 - Needs UI.
 - Should support getting profiles from Firefox for Android.
