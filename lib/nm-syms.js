/**
 * This file is used on Linux to get the symbol table for a library.
 * We call out to the 'nm' command line utility which writes out symbol
 * information to stdout.
 */
const child_process = require('sdk/system/child_process');
const { Cu } = require('chrome');
Cu.importGlobalProperties(['TextEncoder']);

class NMParser {
  constructor() {
    this._addrToSymMap = new Map();
    this._currentLine = '';
    this._approximateSymLength = 0;
  }

  consume(data) {
    const currentLineLength = this._currentLine.length;
    let buffer = this._currentLine + data;
    let nextLineBreak = buffer.indexOf('\n', currentLineLength);
    while (nextLineBreak !== -1) {
      this._processLine(buffer.substr(0, nextLineBreak));
      buffer = buffer.substr(nextLineBreak + 1);
      nextLineBreak = buffer.indexOf('\n');
    }
    this._currentLine = buffer;
  }

  finish() {
    this._processLine(this._currentLine);
    return {
      syms: this._addrToSymMap,
      approximateSymLength: this._approximateSymLength,
    };
  }

  _processLine(line) {
    // Example lines:
    // 00000000028c9888 t GrFragmentProcessor::MulOutputByInputUnpremulColor(sk_sp<GrFragmentProcessor>)::PremulFragmentProcessor::onCreateGLSLInstance() const::GLFP::~GLFP()
    // 00000000028c9874 t GrFragmentProcessor::MulOutputByInputUnpremulColor(sk_sp<GrFragmentProcessor>)::PremulFragmentProcessor::onCreateGLSLInstance() const::GLFP::~GLFP()
    // 00000000028c9874 t GrFragmentProcessor::MulOutputByInputUnpremulColor(sk_sp<GrFragmentProcessor>)::PremulFragmentProcessor::onCreateGLSLInstance() const::GLFP::~GLFP()
    // 0000000003a33730 r mozilla::OggDemuxer::~OggDemuxer()::{lambda()#1}::operator()() const::__func__
    // 0000000003a33930 r mozilla::VPXDecoder::Drain()::{lambda()#1}::operator()() const::__func__
    //
    // Some lines have the form
    // <address> ' ' <letter> ' ' <symbol>
    // and some have the form
    // <address> ' ' <symbol>
    // The letter has a meaning, but we ignore it.

    const firstSpace = line.indexOf(' ');
    if (firstSpace === -1) {
      return;
    }

    const addressString = line.substr(0, firstSpace);
    const symbolStart = line.charAt(firstSpace + 2) === ' ' ? firstSpace + 3 : firstSpace + 1;
    const symbolString = line.substr(symbolStart).trim();
    const address = parseInt(addressString, 16);
    this._addrToSymMap.set(address, symbolString);
    this._approximateSymLength += symbolString.length;
  }
}

// The following two functions below are copied from parse-sym-worker.js.
// I don't know how to easily share code between SDK-style modules and workers.
function convertStringArrayToUint8BufferWithIndex(array, approximateLength) {
  const index = new Uint32Array(array.length + 1);

  const textEncoder = new TextEncoder();
  let buffer = new Uint8Array(approximateLength);
  let pos = 0;

  for (let i = 0; i < array.length; i++) {
    const encodedString = textEncoder.encode(array[i]);
    while (pos + encodedString.length > buffer.length) {
      let newBuffer = new Uint8Array(buffer.length << 1);
      newBuffer.set(buffer);
      buffer = newBuffer;
    }
    buffer.set(encodedString, pos);
    index[i] = pos;
    pos += encodedString.length;
  }
  index[array.length] = pos;

  return { index, buffer };
}

function convertSymsMapToExpectedSymFormat(syms, approximateSymLength) {
  const addresses = Array.from(syms.keys());
  addresses.sort((a, b) => a - b);

  const symsArray = addresses.map(addr => syms.get(addr));
  const { index, buffer } =
    convertStringArrayToUint8BufferWithIndex(symsArray, approximateSymLength);

  return [new Uint32Array(addresses), index, buffer];
}

function feedProcessStdoutInto(proc, consumer) {
  return new Promise((resolve, reject) => {
    proc.stdout.on('data', data => consumer.consume(data));
    proc.on('close', exitCode => {
      if (exitCode == 0) {
        resolve(consumer);
      } else {
        reject(`exit code ${exitCode}`);
      }
    });
    proc.on('error', reject);
  });
}

exports.getSymbolsFromNM = function(path) {
  return Promise.resolve(new NMParser()).then(parser => {
    const nm = child_process.spawn('nm', ['--demangle', path]);
    return feedProcessStdoutInto(nm, parser);
  }).then(parser => {
    // Now do the same for 'dynamic' symbols.
    const nmD = child_process.spawn('nm', ['-D', '--demangle', path]);
    return feedProcessStdoutInto(nmD, parser);
  }).then(parser => {
    const { syms, approximateSymLength } = parser.finish();
    return convertSymsMapToExpectedSymFormat(syms, approximateSymLength);
  });
}
