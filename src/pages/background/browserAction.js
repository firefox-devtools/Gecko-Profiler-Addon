import { subscribe } from 'redux-subscriber';

const popup = browser.browserAction;

function setState({ profiler }) {
  const { isRunning } = profiler;

  popup.setIcon({
    path: `icons/toolbar_${isRunning ? 'on' : 'off'}.png`,
  });
}

export default function init() {
  subscribe('profiler.isRunning', setState);
}
