import { expect } from "chai";
import { checksum, matchingBoxes } from "./day2";

describe('Box Ids (day 2)', function () {
  describe('checksum', function () {
    it('should be based on letter counts', () => {
      expect(checksum([
        'abcdef',
        'bababc',
        'abbcde',
        'abcccd',
        'aabcdd',
        'abcdee',
        'ababab'
      ])).to.equal(12);
    });
  });

  describe('prototype fabric boxes', function () {
    it('should differ exactly in one character', () => {
      expect(matchingBoxes([
        'abcde',
        'fghij',
        'klmno',
        'pqrst',
        'fguij',
        'axcye',
        'wvxyz'
      ])).to.equal('fgij');
    });

  });
});
