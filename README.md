# Gecko Profiler

This add-on lets you collect profiles from Firefox, and open those profiles in [perf-html](https://perf-html.io/).

## Installation

The easiest way to install it is to go to [https://perf-html.io/](https://perf-html.io/) and click the link on there.

Doing so will install the file `gecko_profiler.xpi` from this repository.

## Usage

The profiler is automatically started on startup. It adds a toolbar button to your main toolbar.
The button's icon is blue if the profiler is running and gray if the profiler is stopped.

Profile data is stored in a circular buffer. As soon as the buffer fills up for the first time, old data is discarded as new data is added.
That means that you can leave the profiler running, and collect a snapshot of the most recent couple of seconds at any time.

You can control the profiler with two keyboard shortcuts:

 - <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>1</kbd>: Stop / Restart profiling
 - <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>2</kbd>: Capture the profile. This captures the current contents of the profiler buffer, opens a tab with perf-html at `https://perf-html.io/`, and sends the profile to it.

If you want to run your own perf-html instance or want profiles to be sent to a different site that you're developing, you can change the “Reporter URL” preference of this add-on on `about:addons`.

## Development

Make sure you have somewhat recent versions of node and npm installed. Then:

```bash
$ git clone https://github.com/devtools-html/Gecko-Profiler-Addon/
$ cd Gecko-Profiler-Addon/
$ npm install
$ npm start
```

The `npm start` command runs [Firefox Nightly](http://nightly.mozilla.org/) by default. To run other releases of Firefox use the following `npm start` commands.

#### [Beta Firefox](https://www.mozilla.org/en-US/firefox/channel/desktop/#beta)

```bash
npm start --geckoprofiler:firefox=beta
```

#### [Release Firefox](https://www.mozilla.org/firefox/)

```bash
npm start --geckoprofiler:firefox=firefox
```

#### Release config

Or you can set the local config to keep the default for the life of your local repository and no longer need to pass the config on the command line.

```bash
npm config set geckoprofiler:firefox beta
npm start
```

## Packaging a new version

If you want to package a new version of the add-on, you need to be registered as
an author of the add-on on addons.mozilla.org. Otherwise you can ignore this
section and ask Markus or Greg to do the packaging for you.

If you are registered as an author of the add-on on addons.mozilla.org, you
should have an API key and an API secret. I think you can ask addons.mozilla.org
to generate those for you if you don't have them.

Packaging a new version works like this:

 1. Commit your other changes first, so that the update can be its own changeset.
 2. Go to `manifest.json` and increment the version.
 3. Go to `updates.json` and do the same (the two need to match).
 4. Make sure you have a somewhat recent version of `web-ext` installed, at least
    version 2.3.0. You can install it using `npm install -g web-ext`.
 5. Execute the following command, replacing `<api-key>` with your API key and `<api-secret>` with your API secret: `web-ext sign -i README.md package.json *.rdf transition resources --api-key <api-key> --api-secret <api-secret> && mv ./web-ext-artifacts/gecko_profiler*.xpi ./gecko_profiler.xpi`
    (The `-i` in that command means "ignore".)
 6. Commit the changes to `manifest.json`, `updates.json` and `gecko_profiler.xpi`
    with the commit message `Release <new version number>.`.
 7. Create a PR and merge.

Landing these changes in the `https://github.com/devtools-html/Gecko-Profiler-Addon/`
repository will automatically cause existing installations of the add-on to update
to the new version. This works because we specify the following URL as the
`update_url` in `manifest.json`:
`https://raw.githubusercontent.com/devtools-html/Gecko-Profiler-Addon/master/updates.json`. And that file contains the following "update link" URL:
`https://raw.githubusercontent.com/devtools-html/Gecko-Profiler-Addon/master/gecko_profiler.xpi`
This URL always points at the most recent `gecko_profiler.xpi` in the repository.

## Known issues

 - Does not support getting profiles from Firefox for Android.
