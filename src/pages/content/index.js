/* global cloneInto, exportFunction  */
import { createUIStore } from 'redux-webext';

import { getSymbols } from './actions';

import { unique } from '../../utils/symbol';

// utility to convert promises to local "page" promises instead of content
function promise(cb, unsafeWindow = window.wrappedJSObject) {
  return new unsafeWindow.Promise(
    exportFunction((resolve, reject) => {
      return cb(result =>
        resolve(cloneInto(result, unsafeWindow), error =>
          reject(cloneInto(error, unsafeWindow))
        )
      );
    }, unsafeWindow)
  );
}

(async () => {
  const store = await createUIStore();
  const unsafeWindow = window.wrappedJSObject;

  if (store) {
    const connect = {
      getProfile: () => {
        return promise(resolve => {
          resolve(cloneInto(store.getState().profiler.profile, unsafeWindow));
        });
      },
      getSymbolTable: (debugName, breakpadId) => {
        return promise(resolve => {
          // subscribe to changes in the store until our symbol arrives so we
          // can resolve the promise and unsubscribe from changes
          const unsubscribe = store.subscribe(() => {
            const symbol = store.getState().profiler.symbols[
              unique(debugName, breakpadId)
            ];
            if (symbol) {
              unsubscribe();
              resolve(cloneInto(symbol, unsafeWindow));
            }
          });
          store.dispatch(getSymbols(debugName, breakpadId));
        }, unsafeWindow);
      },
    };

    if (unsafeWindow.connectToGeckoProfiler) {
      unsafeWindow.connectToGeckoProfiler(
        cloneInto(connect, unsafeWindow, { cloneFunctions: true })
      );
    } else {
      console.error(
        'unsafeWindow.connectToGeckoProfiler did not exist',
        unsafeWindow.connectToGeckoProfiler
      );
    }
  } else {
    console.error('unable to connect this page to the extension');
  }
})();
