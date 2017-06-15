# Gecko Profiler

This add-on lets you collect profiles from Firefox, and open those profiles in [perf.html](https://perf-html.io/).

## Installation

The easiest way to install it is to go to [https://perf-html.io/](https://perf-html.io/) and click the link on there.

Doing so will install the WebExtension in the [`gecko_profiler.xpi`](./gecko_profiler.xpi) file in this repository.

## Usage

The add-on creates a toolbar button to your main toolbar. The button is blue when the profiler is running and gray when the profiler is stopped.

The profiler records data in a circular buffer. As soon as the buffer fills up for the first time, old data is discarded as new data is added.
That means that you can leave the profiler running, and collect a snapshot of the most recent couple of seconds at any time.  To increase the amount of data that can be stored in your buffer adjust the "Buffer size" in your settings.

You can control the profiler with two keyboard shortcuts:

 - <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>1</kbd>: Stop / Start profiler
 - <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>2</kbd>: Capture the profile. This captures the current contents of the profiler buffer, opens a tab with perf-html at `https://perf-html.io/`, and sends the profile to it.

If you want to run your own perf-html instance or want profiles to be sent to a different site that you're developing, you can change the “Reporter URL” preference of this add-on on `about:addons`.

## Development

You need to download [Firefox Nightly](https://nightly.mozilla.org) and  somewhat recent versions of node and npm installed.

```bash
$ git clone https://github.com/devtools-html/Gecko-Profiler-Addon/
$ cd Gecko-Profiler-Addon/
$ npm install
```

First we'll run a new instance of Firefox with the add-on loaded from source.

```bash
$ npm start
```

Now we need to run `webpack` to build our source code modules into the top level background, options, and popup files.

```bash
$ # in another terminal tab
$ npm run dev
```

Now you can edit the code in the [`src`](./src) directory and those changes will be compiled into the top level files which will automatically reload the add-on running in Firefox.

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

## Tests

Test are run using the Jest framework.  All test files are located in the [`__tests__`](./__tests__) directory. Test coverage is turned on by default and should output current coverage in your console.

```bash
$ npm test
```

We use the `jest-webextension-mock` module to mock the WebExtension APIs, the goal of these unit tests is to know that a certain intended action actually triggers the API calls we hope for. 

## Known issues

 - Does not support getting profiles from Firefox for Android.
