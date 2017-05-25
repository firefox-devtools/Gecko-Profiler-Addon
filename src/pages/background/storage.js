import store from './redux/store';
import { update } from './redux/actions/settings';

export const SETTINGS_KEY = 'profilerState';

export default async function init() {
  const state = await browser.storage.local.get(SETTINGS_KEY);
  store.dispatch(update(state[SETTINGS_KEY]));
}
