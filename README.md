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

Now we need to run `webpack` to build our source code modules into the top level background, options, and popup files.

```bash
$ # in another terminal tab
$ npm run dev
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

## UI Only

If you want to work on only the UI components for updating the CSS/HTML of the popup or options pages use storybook. Storybook will "hot reload" all your changes allowing you to develop the pages quickly without running them in the extension.

```bash
$ npm run storybook
```

## Known issues

 - Does not support getting profiles from Firefox for Android.
