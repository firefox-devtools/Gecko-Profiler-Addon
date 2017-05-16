/* global cloneInto, exportFunction  */
import { createUIStore } from 'redux-webext';

import * as actions from './actions';

import { unique } from '../../utils/symbol';

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

  if (store) {
    const unsafeWindow = window.wrappedJSObject;
    const connect = {
      getProfile: () => {
        return promise(resolve => {
          resolve(cloneInto(store.getState().profiler.profile, window));
        });
      },
      getSymbolTable: (debugName, breakpadId) => {
        return promise(async resolve => {
          await store.dispatch(actions.symbols(debugName, breakpadId));
          resolve(
            cloneInto(
              store
                .getState()
                .profiler.symbols.get(unique(debugName, breakpadId)),
              window
            )
          );
        });
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

    unsafeWindow.profile = cloneInto(
      store.getState().profiler.profile,
      unsafeWindow
    );
    // window.wrappedJSObject.symbols = cloneInto(
    //   store.getState().profiler.symbols,
    //   window
    // );
  }
})();
