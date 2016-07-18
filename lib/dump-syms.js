const { ChromeWorker } = require('chrome');
const { data } = require('sdk/self');

exports.dumpSyms = function(path, blob, platform, arch) {
  let filename = path.substr(path.lastIndexOf("/") + 1);
  if (platform != 'mac' && platform != 'linux')
    platform = filename.endsWith('.so') ? 'linux' : 'mac';
  return new Promise(function (resolve, reject) {
    let worker = new ChromeWorker(data.url("dump-syms-worker.js"));
    worker.onmessage = function (e) {
      if (e.data && ('type' in e.data)) {
        switch (e.data.type) {
          case "error":
            reject(e.data.error);
            break;
          case "success":
            resolve(e.data.result);
            break;
          case "printErr":
            console.log(e.data.text);
            break;
        }
      }
    }
    let scriptURL = data.url(`dump_syms-${platform}.js`);
    worker.postMessage({
      type: "request",
      filename, blob, path, platform, arch, scriptURL
    });
  });
}
