#Gecko Profiler

This add-on lets you collect profiles from Firefox, and open those profiles in [cleopatra](https://new.cleopatra.io/).

##Installation

The easiest way to install it is to go to [https://new.cleopatra.io/](https://new.cleopatra.io/) and click the link on there.

Doing so will install the file `gecko_profiler.xpi` from this repository.

##Usage

The profiler is automatically started on startup. It adds a toolbar button to your main toolbar.
The button's icon is blue if the profiler is running and gray if the profiler is stopped.

Profile data is stored in a circular buffer. As soon as the buffer fills up for the first time, old data is discarded as new data is added.
That means that you can leave the profiler running, and collect a snapshot of the most recent couple of seconds at any time.

You can control the profiler with two keyboard shortcuts:

 - <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>1</kbd>: Stop / Restart profiling
 - <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>2</kbd>: Capture the profile. This captures the current contents of the profiler buffer, opens a tab with cleopatra at `https://new.cleopatra.io/`, and sends the profile to it.

If you want to run your own cleopatra instance or want profiles to be sent to a different site that you're developing, you can change the “Reporter URL” preference of this add-on on `about:addons`.

##Development

Make sure you have somewhat recent versions of node and npm installed. Then:

```bash
$ git clone https://github.com/mstange/Gecko-Profiler-Addon/
$ cd Gecko-Profiler-Addon/
$ npm install                 # installs jpm
$ npm run start-mac-nightly   # runs jpm --binary /Applications/FirefoxNightly.app
$ # Or, if you're on a different platform, or want to use a different Firefox binary:
$ npm run -- --binary /path/to/Firefox
```

##Known issues

 - Does not support getting profiles from Firefox for Android.
 - Does not allow symbolicating locally-built Firefox binaries on Windows.
