import store from './redux/store';
import { toggle, capture } from './redux/actions/profiler';

export const TOGGLE_PROFILE_COMMAND = 'ToggleProfiler';
export const CAPTURE_PROFILE_COMMAND = 'CaptureProfile';

export default function init() {
  browser.commands.onCommand.addListener(command => {
    if (command === TOGGLE_PROFILE_COMMAND) {
      return store.dispatch(toggle());
    } else if (command === CAPTURE_PROFILE_COMMAND) {
      return store.dispatch(capture());
    }
  });
}
