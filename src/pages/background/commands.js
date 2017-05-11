import store from './redux/store';
import { toggle, capture } from './redux/actions/profiler';

export default function init() {
  browser.commands.onCommand.addListener(command => {
    if (command === 'ToggleProfiler') {
      store.dispatch(toggle());
    } else if (command === 'CaptureProfile') {
      store.dispatch(capture());
    }
  });
}
