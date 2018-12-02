import { expect } from "chai";
import { checksum } from "./day2";

describe('Box Id checksum (day 2)', function () {
  describe('should be based on letter counts', function () {
    it('example', () => {
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

});
