const { createWorker } = require('lib/worker');

exports.parseSym = function(text, mayTransfer) {
  return new Promise(function (resolve, reject) {
    var worker = createWorker('parse-sym-worker.js');
    worker.postMessage({
      type: 'request',
      text: text
    }, mayTransfer ? [text.buffer] : []);
    worker.onmessage = function (e) { 
      if (e.data.type == 'success') {
        resolve(e.data.result);
      } else if (e.data.type == 'error') {
        reject(e.data.error);
      }
    }
  });
}
