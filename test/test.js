let hamming = require('../index.js').hamming;
let haffman = require('../index.js').huffman
let assert = require('chai').assert;

describe('Hamming code testing', function() {
  it('should correctly encode 4 bits to 7-bit hamming code', function() {
    let input = [1, 0, 1, 1];
    let encoded = hamming.encode(input);
    assert.deepEqual(encoded, [0, 1, 1, 0, 0, 1, 1]);
  });

  it('should correctly decode a valid 7-bit hamming code', function() {
    let encoded = [0, 1, 1, 0, 0, 1, 1];
    let decoded = hamming.decode(encoded);
    assert.deepEqual(decoded, [1, 0, 1, 1]);
  });

  it('should detect no error in a valid code (isValid = true)', function() {
    let encoded = [0, 1, 1, 0, 0, 1, 1];
    let valid = hamming.isValid(encoded);
    assert.isTrue(valid);
  });

  it('should fix a 1-bit error and still decode correctly', function() {
    let input = [1, 0, 1, 1];
    let encoded = hamming.encode(input);
    let corrupted = hamming.injectError(encoded, 3); // introduce error at position 3
    let decoded = hamming.decode(corrupted);
    assert.deepEqual(decoded, input);
  });
});
describe('haffman Unit Tests', function () {
  it('should correctly build a frequency table', function () {
      let result = haffman.buildFrequencyTable('aabbbc');
      assert.deepEqual(result, { a: 2, b: 3, c: 1 });
  });

  it('should count unique symbols', function () {
      let result = haffman.countUniqueSymbols('aabbc');
      assert.equal(result, 3);
  });

  it('should validate compressed data containing only 0 and 1', function () {
      let result = haffman.isValidCompressedData('0101011');
      assert.isTrue(result);
  });

  it('should return false for invalid compressed data', function () {
      let result = haffman.isValidCompressedData('01012A01');
      assert.isFalse(result);
  });
});
