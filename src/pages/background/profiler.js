import store from './redux/store';
import { running } from './redux/actions';

export default function init() {
  browser.geckoProfiler.onRunning.addListener(isRunning =>
    store.dispatch(running(isRunning))
  );
}
