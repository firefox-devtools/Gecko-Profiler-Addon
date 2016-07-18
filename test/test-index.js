var main = require("../");

exports["test main async"] = function(assert, done) {
  assert.pass("async Unit test running!");
  done();
};

exports["test dummy"] = function(assert, done) {
  let array = new Uint32Array([3, 6, 7]);
  main.dummy(array, function(result) {
    assert.equal(typeof result, typeof array, "Is the type of the typed array preserved");
    assert.equal(result.length, array.length, "Is the length preserved");
    assert.equal(result[1], array[1], "Is element 1 preserved");
    done();
  });
};

exports["test getNSSSymbols"] = function(assert, done) {
  main.getNSSSymbols().then(result => {
    if (result.length > 0) {
      assert.pass("Found one libnss3 library");
      let [addrs, syms] = result[0];
      assert.ok(addrs.buffer, "addrs should be a typed array");
      assert.ok(addrs.length >= 3, "Found at least 3 symbols in the NSS library");
      assert.equal(addrs.length, syms.length, "addrs and syms should be of the same length");
      assert.equal(typeof syms[2], "string", "syms should be strings");
    } else {
      assert.fail("getNSSSymbols failed to find an NSS library.");
    }
    done();
  }, error => {
    assert.fail(`getNSSSymbols failed with error ${error}`);
    done();
  });
};

require("sdk/test").run(exports);
