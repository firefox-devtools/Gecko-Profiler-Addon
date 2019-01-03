# Gecko Profiler

This add-on lets you collect profiles from Firefox, and open those profiles in [perf-html](https://perf-html.io/).

## Installation

Most users install it from [https://perf-html.io/](https://perf-html.io/) and click the link on there.

It's also possible to install it directly from this repository by first downloading the file [`gecko_profiler.xpi`](./gecko_profiler.xpi?raw=true) to your local computer. Then drag and drop it to the Firefox window to install it.

## Usage

The add-on adds a toolbar button to your main toolbar.
The button's icon is blue if the profiler is running and gray if the profiler is stopped.
To start the profiler, click the toolbar button, and in the panel that opens, click "Start" in the top right corner.

Profile data is stored in a circular buffer. As soon as the buffer fills up for the first time, old data is discarded as new data is added.
That means that you can leave the profiler running, and collect a snapshot of the most recent couple of seconds at any time.

You can control the profiler with two keyboard shortcuts:

 - <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>1</kbd>: Stop / Restart profiling
 - <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>2</kbd>: Capture the profile. This captures the current contents of the profiler buffer, opens a tab with perf-html at `https://perf-html.io/`, and sends the profile to it.

If you want to run your own perf-html instance or want profiles to be sent to a different site that you're developing, you can change the “Reporter URL” preference of this add-on on `about:addons`.

## Development

Make sure you have somewhat recent versions of node and yarn installed. Then:

```bash
$ git clone https://github.com/devtools-html/Gecko-Profiler-Addon/
$ cd Gecko-Profiler-Addon/
$ yarn install
$ yarn start
```

The `yarn start` command runs [Firefox Nightly](http://nightly.mozilla.org/) by default. To run other releases of Firefox you can configure it using the command:

```bash
yarn config set geckoprofiler:firefox beta
yarn start
```

Note that on some platforms (eg: Linux) you'll rather specify the full path to Firefox.

## Packaging a new version

If you want to package a new version of the add-on, you need to be registered as
an author of the add-on on addons.mozilla.org. Otherwise you can ignore this
section and ask @mstange or @gregtatum to do the packaging for you.

If you are registered as an author of the add-on on addons.mozilla.org, you
should [use your API key and API secret](https://addons.mozilla.org/en-US/developers/addon/api/key/).

Packaging a new version works like this:

 1. Commit your other changes first, so that the update can be its own changeset.
 2. Go to `manifest.json` and increment the version.
 3. Go to `updates.json` and do the same (the two need to match).
 4. Set your environment variables $AMO_JWT_ISSUER and $AMO_JWT_SECRET to the API key an API secret respectively.
 5. Run `yarn sign-extension`
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
