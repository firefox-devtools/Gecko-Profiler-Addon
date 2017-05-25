import store from './redux/store';
import { SETTINGS_KEY } from './redux/middlewares/browser.storage';
import { update } from './redux/actions/settings';

export default function init() {
  browser.storage.local.get(SETTINGS_KEY).then(state => {
    store.dispatch(update(state[SETTINGS_KEY]));
  });
}
