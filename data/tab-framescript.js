let gProfile = null;

addMessageListener("GeckoProfilerAddon:Init", e => {
  gProfile = e.data;
  connectToPage();
  addEventListener("DOMContentLoaded", connectToPage);
});

function connectToPage() {
  const unsafeWindow = content.wrappedJSObject;
  if (unsafeWindow.connectToGeckoProfiler) {
    unsafeWindow.connectToGeckoProfiler(makeAccessibleToPage({
      getProfile: () => Promise.resolve(gProfile),
      getSymbolTable: (debugName, breakpadId) => getSymbolTable(debugName, breakpadId),
    }, unsafeWindow));
  }
}

function getSymbolTable(debugName, breakpadId) {
  return new Promise((resolve, reject) => {
    sendAsyncMessage('GeckoProfilerAddon:GetSymbolTable', { debugName, breakpadId });
    addMessageListener('GeckoProfilerAddon:GetSymbolTableReply', e => {
      const data = e.data;
      if (data.debugName === debugName && data.breakpadId === breakpadId) {
        if (data.status === 'success') {
          resolve(data.result);
        } else {
          reject(data.error);
        }
      }
    });
  });
}


// Security stuff below, you usually don't need to read this.

// Create a promise that can be used in the page.
function createPromiseInPage(fun, contentGlobal) {
  function funThatClonesObjects(resolve, reject) {
    return fun(result => resolve(Components.utils.cloneInto(result, contentGlobal)),
               error => reject(Components.utils.cloneInto(error, contentGlobal)));
  }
  return new contentGlobal.Promise(Components.utils.exportFunction(funThatClonesObjects, contentGlobal));
}

// Returns a function that calls the original function and tries to make the
// return value available to the page.
function wrapFunction(fun, contentGlobal) {
  return function () {
    let result = fun.apply(this, arguments);
    if (typeof result === 'object') {
      if (('then' in result) && (typeof result.then === 'function')) {
        // fun returned a promise.
        return createPromiseInPage((resolve, reject) => result.then(resolve, reject), contentGlobal);
      }
      return Components.utils.cloneInto(result, contentGlobal);
    }
    return result;
  }
}

// Pass a simple object containing values that are objects or functions.
// The objects or functions are wrapped in such a way that they can be
// consumed by the page.
function makeAccessibleToPage(obj, contentGlobal) {
  let result = Components.utils.createObjectIn(contentGlobal);
  for (let field in obj) {
    switch (typeof obj[field]) {
      case 'function':
        Components.utils.exportFunction(wrapFunction(obj[field], contentGlobal), result, { defineAs: field });
        break;
      case 'object':
        Components.utils.cloneInto(obj[field], result, { defineAs: field });
        break;
      default:
        result[field] = obj[field];
        break;
    }
  }
  return result;
}
