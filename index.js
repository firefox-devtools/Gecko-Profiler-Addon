const self = require('sdk/self');
const { Hotkey } = require("sdk/hotkeys");
const { prefs } = require("sdk/simple-prefs");
const { ToggleButton } = require('sdk/ui/button/toggle');
const { Panel } = require("sdk/panel");

const devtoolsPanel = require("lib/devtools-panel");
const profiler = require("lib/profiler");
const symbolStore = require("lib/symbol-store");
const { createProfilerUIController } = require("lib/ui-controller");

let uiController;

const panel = Panel({
  width: 330,
  height: 168 + 2,
  contentURL: self.data.url('panel.html'),
  contentScriptFile: self.data.url('panel.js'),
  onHide: () => {
    try {
      button.state('window', { checked: false });
    } catch (e) {}
  },
});

const button = ToggleButton({
  id: 'gecko-profiler',
  label: 'Gecko Profiler',
  icon: self.data.url('img/toolbar_off.png'),
  onChange: (state) => {
    if (state.checked) {
      panel.port.emit('ProfilerStateUpdated', uiController.getUpToDateSettings());
      panel.port.emit('ProfilerStateUpdated', { settingsOpen: false });
      panel.resize(panel.width, 168 + 2);
      panel.show({ position: button });
    }
  },
});

profiler.addIsRunningObserver(isRunning => {
  button.icon = isRunning ? self.data.url('img/toolbar_on.png') : self.data.url('img/toolbar_off.png');
});

panel.port.on('ProfilerControlEvent', e => {
  switch (e.type) {
    case 'PanelHeightUpdated':
      panel.resize(panel.width, e.height + 2);
      break;
    default:
  }
});

let startStopHotKey = Hotkey({
  combo: "control-shift-1",
  onPress: () => uiController.toggleProfilerStartStop()
});

let collectHotKey = Hotkey({
  combo: "control-shift-2",
  onPress: () => uiController.collectProfile()
});

function main(options, callbacks) {
  devtoolsPanel.startup();

  uiController = createProfilerUIController(
    'profiler', panel.port, profiler, prefs.reportUrl
  );
}

function onUnload(reason) {
  devtoolsPanel.shutdown();
}

exports.main = main;
exports.onUnload = onUnload;
