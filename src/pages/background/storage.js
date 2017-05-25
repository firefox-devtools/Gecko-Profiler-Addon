import store from './redux/store';
import { update } from './redux/actions/settings';

export const SETTINGS_KEY = 'profilerState';

export default function init() {
  browser.storage.local.get(SETTINGS_KEY).then(state => {
    store.dispatch(update(state[SETTINGS_KEY]));
  });
}
