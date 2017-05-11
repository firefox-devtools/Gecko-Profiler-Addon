import store from './redux/store';
import { update } from './redux/actions/settings';

export default function init() {
  browser.storage.local.get('profilerState').then(state => {
    store.dispatch(update(state));
  });
}
