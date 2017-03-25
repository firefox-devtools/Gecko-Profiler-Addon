"use strict";

const self = require("sdk/self");

const { Cu, Ci } = require("chrome");
const { MessageChannel } = require("sdk/messaging");
const { prefs } = require("sdk/simple-prefs");
const { gDevTools } = Cu.import("resource://devtools/client/framework/gDevTools.jsm", {});
const { loader } = Cu.import("resource://devtools/shared/Loader.jsm", {});
const { profilerForClient } = require('./remote-profiler');
const { createProfilerUIController } = require('./ui-controller');

loader.lazyRequireGetter(this, "EventEmitter", "devtools/shared/event-emitter");

/**
 * This is the add-on's panel, wrapping the tool's contents.
 *
 * @param nsIDOMWindow iframeWindow
 *        The iframe window containing the tool's markup and logic.
 * @param Toolbox toolbox
 *        The developer tools toolbox, containing all tools.
 */
function GeckoProfilerDevtoolsPanel(iframeWindow, toolbox) {
  this.panelWin = iframeWindow;
  this.toolbox = toolbox;
  EventEmitter.decorate(this);
};

GeckoProfilerDevtoolsPanel.prototype = {
  get target() {
    return this.toolbox.target;
  },

  /**
   * Open is effectively an asynchronous constructor.
   * Called when the user select the tool tab.
   *
   * @return object
   *         A promise that is resolved when the tool completes opening.
   */
  open: async function() {
    this.profiler = await profilerForClient(this.target.client);

    this.onReady();

    this.isReady = true;
    this.emit("ready");
    return this;
  },

  postMessage: function (msg, transfer) {
    this.panelWin.postMessage(msg, '*', transfer);
  },

  /**
   * Called when the user closes the toolbox or disables the add-on.
   *
   * @return object
   *         A promise that is resolved when the tool completes closing.
   */
  destroy: async function() {
    this.isReady = false;
    this.emit("destroyed");
  },

  onReady: function () {
    const channel = new MessageChannel();
    const port = channel.port1;

    this.postMessage("YoHelloDearProfilerPanel", [channel.port2]);

    const panel = {
      port: {
        on: (messageName, fun) => panel._stuff.on.push({ messageName, fun }),
        emit: (messageName, obj) => port.postMessage({ messageName, obj }),
      },
      _stuff: {
        on: [],
      },
    };

    port.onmessage = ({ data: { messageName, obj } }) => {
      for (const listener of panel._stuff.on) {
        if (listener.messageName === messageName) {
          listener.fun(obj);
        }
      }
    };

    this.uiController = createProfilerUIController(
      'profiler.remote', panel.port, this.profiler, prefs.reportUrl
    );
  },
};

let toolDefinition = {
  // A unique id. Must not contain whitespace.
  id: "gecko-profiler-addon",

  // The position of the tool's tab within the toolbox
  ordinal: 99,
  // Main keybinding key (used as a keyboard shortcut).
  key: "",
  // Main keybinding modifiers.
  modifiers: "",

  // The url of the icon, displayed in the Toolbox.
  icon: self.data.url("./img/toolbar_off.png"),
  invertIconForLightTheme: false,

  // A tool lives in its own iframe. The Toolbox will load this URL.
  url: self.data.url("./devtools-panel.html"),

  label: "Gecko Profiler",
  tooltip: "This panel is provided by the Gecko Profiler add-on.",

  // If the target is not supported, the toolbox will hide the tab.
  // Targets can be local or remote (used in remote debugging).
  isTargetSupported: function(target) {
    // Don't show the button on local tabs, the add-on's toolbar button is a
    // better interface than a distracting devtools tab.
    return !target.isLocalTab;
  },

  // This function is called when the user select the tool tab.
  // It is called only once the tool definition's URL is loaded.
  build: function(iframeWindow, toolbox) {
    let panel = new GeckoProfilerDevtoolsPanel(iframeWindow, toolbox);
    return panel.open();
  }
}

function startup() {
  gDevTools.registerTool(toolDefinition);
}

function shutdown() {
  gDevTools.unregisterTool(toolDefinition);
}

exports.startup = startup;
exports.shutdown = shutdown;
