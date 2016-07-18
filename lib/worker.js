const self = require('sdk/self');
const { Cu } = require('chrome');
const { Worker } = Cu.import(self.data.url('Worker.jsm'));

exports.createWorker = function (filenameInDataDir) {
  return new Worker(self.data.url(filenameInDataDir));
}
