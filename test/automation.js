let haffman = require('../index.js').huffman
let assert = require('chai').assert;

describe('haffman basic unit tests', function () {

    // 1. Correctness of compression and decompression
    it('should compress and decompress string correctly', function () {
        let data = 'testdata';
        let freqTable = haffman.buildFrequencyTable(data);
        let tree = haffman.buildHuffmanTree(freqTable);
        let codeTable = haffman.buildCodeTable(tree);
        let compressed = haffman.compressData(data, codeTable);
        let decompressed = haffman.decompressData(compressed, tree);
        assert.equal(decompressed, data);
    });

    // 2. Frequency table generation test
    it('should build correct frequency table', function () {
        let data = 'aabb';
        let freqTable = haffman.buildFrequencyTable(data);
        assert.deepEqual(freqTable, { a: 2, b: 2 });
    });

    // 3. Code table should contain all unique symbols
    it('should contain codes for all unique symbols', function () {
        let data = 'abc';
        let freqTable = haffman.buildFrequencyTable(data);
        let tree = haffman.buildHuffmanTree(freqTable);
        let codeTable = haffman.buildCodeTable(tree);
        assert.hasAllKeys(codeTable, ['a', 'b', 'c']);
    });

    it('should decompress single-symbol string correctly', function () {
        let data = 'aaaa';
        let freqTable = haffman.buildFrequencyTable(data);
        let tree = haffman.buildHuffmanTree(freqTable);
        let codeTable = haffman.buildCodeTable(tree);
        let compressed = haffman.compressData(data, codeTable);
        let decompressed = haffman.decompressData(compressed, tree);
        assert.equal(decompressed, data);
    });

});
