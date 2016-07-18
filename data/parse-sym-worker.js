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

function parseSym(text) {
  const syms = new Map();

  let approximateSymLength = 0;

  function addSym(address, symStart, symEnd) {
    const sym = text.substring(symStart, symEnd).trimRight();
    approximateSymLength += sym.length;
    syms.set(address, sym);
  }

  let nextPublic = text.indexOf('\nPUBLIC ');
  let nextFunc = text.indexOf('\nFUNC ');
  while (nextPublic != -1 || nextFunc != -1) {
    if (nextFunc == -1 || nextPublic < nextFunc) {
      // Parse PUBLIC line: PUBLIC <address> <stack_param_size> <name>
      const addrStart = nextPublic + '\nPUBLIC '.length;
      const addrEnd = text.indexOf(' ', addrStart);
      const address = parseInt(text.substring(addrStart, addrEnd), 16);
      const symStart = text.indexOf(' ', addrEnd + 1) + 1;
      const symEnd = text.indexOf('\n', symStart);
      addSym(address, symStart, symEnd);
      nextPublic = text.indexOf('\nPUBLIC ', symEnd);
    } else {
      // Parse FUNC line: FUNC <address> <size> <stack_param_size> <name>
      const addrStart = nextFunc + '\nFUNC '.length;
      const addrEnd = text.indexOf(' ', addrStart);
      const address = parseInt(text.substring(addrStart, addrEnd), 16);
      const symStart = text.indexOf(' ', text.indexOf(' ', addrEnd + 1) + 1) + 1;
      const symEnd = text.indexOf('\n', symStart);
      addSym(address, symStart, symEnd);
      nextFunc = text.indexOf('\nFUNC ', symEnd);
    }
  }

  const addresses = Array.from(syms.keys());
  addresses.sort((a, b) => a - b);

  const symsArray = addresses.map(addr => syms.get(addr));
  const { index: symindex, buffer: symbuffer } = convertStringArrayToUint8BufferWithIndex(symsArray, approximateSymLength);

  return [new Uint32Array(addresses), symindex, symbuffer];
}

function convertToText(text) {
  if (text instanceof String) {
    return Promise.resolve(text);
  }
  if (text instanceof Uint8Array) {
    let decoder = new TextDecoder("utf-8");
    return Promise.resolve(decoder.decode(text));
  }
  if (text instanceof Blob) {
    let fileReader = new FileReaderSync();
    return Promise.resolve(fileReader.readAsText(text, "utf-8"));
  }
  return Promise.reject(new Error("invalid input"));
}

onmessage = function (e) {
  if (e.data.type == 'request') {
    convertToText(e.data.text).then(text => {
      const [addresses, symindex, symbuffer] = parseSym(text);
      postMessage({
        type: 'success',
        result: [addresses, symindex, symbuffer]
      }, [addresses.buffer, symindex.buffer, symbuffer.buffer]);
    }, e => {
      postMessage({
        type: 'error',
        error: e.toString()
      });
    });
  }
}
