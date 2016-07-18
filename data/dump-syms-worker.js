function SingleBufferStream() {
  this.buffer = new Uint8Array(1024);
  this.writePos = 0;
}
SingleBufferStream.prototype = {
  open: function (stream) {
    stream.seekable = false;
  },
  close: function (stream) {},
  flush: function (stream) {},
  read: function (stream, buffer, offset, length, pos) {
    throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
  },
  write: function (stream, buffer, offset, length, pos) {
    while ((this.writePos + length) >= this.buffer.length) {
      // this.buffer needs to be resized
      var newBuffer = new Uint8Array(this.buffer.length * 2);
      newBuffer.set(this.buffer);
      this.buffer = newBuffer;
    }

    for (var i = 0; i < length; i++) {
      this.buffer[this.writePos++] = buffer[offset + i];
    }
    return length;
  },
  getOutput: function () {
    return this.buffer.subarray(0, this.writePos);
  }
};

var stdoutStream = new SingleBufferStream();

var discardStream = {
  open: function (stream) {
    stream.seekable = false;
  },
  close: function (stream) {},
  flush: function (stream) {},
  read: function (stream, buffer, offset, length, pos) {
    throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
  },
  write: function (stream, buffer, offset, length, pos) {
    return length;
  }
};

var Module = {
  preRun: [function () {
    FS.registerDevice(FS.makedev(5, 0), stdoutStream); // stdout
    FS.registerDevice(FS.makedev(6, 0), discardStream); // stderr
    enlargeMemory = function () {
      postMessage({type: "error", error: "Insufficient memory."});
      throw new Error("Cannot enlarge memory.");
    }
  }],
  postRun: [
    function() {
      var output = stdoutStream.getOutput();
      postMessage({type: "success", result: output}, [output.buffer]);
    }
  ],
  print: function(text) {
    // Our stdout stream override overwrites the usual caller of
    // Module['print'], so this is probably never called.
  },
  printErr: function(text) {
    // Our stderr stream override overwrites the usual caller of
    // Module['printErr'].
    postMessage({type: "printErr", text: text});
  },
  noImageDecoding: true,
  TOTAL_STACK: 262144
};

onerror = function(event) {
  postMessage({type: "error", error: event});
};

function getFileArray(blob, path) {
  if (blob) {
    var fileReader = new FileReaderSync();
    return new Uint8Array(fileReader.readAsArrayBuffer(blob));
  }

  importScripts("resource://gre/modules/osfile.jsm");
  return OS.File.read(path);
}

// This uses the code from emscripten to make TOTAL_MEMORY asm.js spec
// compliant. We do it here in order to avoid the (harmless) log message.
function adjustedTotalMemory(targetVal) {
  var totalMemory = 64*1024;
  while (totalMemory < targetVal || totalMemory < 2*Module.TOTAL_STACK) {
    if (totalMemory < 16*1024*1024) {
      totalMemory *= 2;
    } else {
      totalMemory += 16*1024*1024
    }
  }
  return totalMemory;
}

onmessage = function (e) {
  if (e.data && e.data.type == "request") {
    if (e.data.platform != 'mac' && e.data.platform != 'linux') {
      postMessage({type: "error", error: "unknown platform"});
      return;
    }

    var fileArray = getFileArray(e.data.blob, e.data.path);
    var byteCount = fileArray.length;
    Module.preRun.push(function () {
      FS.createDataFile('/', e.data.filename, fileArray, true, true, true);
      fileArray = null;
    });
    Module.arguments = (e.data.platform == 'mac' && e.data.arch) ? ['-a', e.data.arch] : [];
    Module.arguments.push('-c');
    Module.arguments.push('/' + e.data.filename);
    var maxMemory = 1.98 * 1024 * 1024 * 1024;
    Module.TOTAL_MEMORY = adjustedTotalMemory(Math.min(maxMemory, byteCount * 3.5));
    importScripts(e.data.scriptURL);
  }
}
