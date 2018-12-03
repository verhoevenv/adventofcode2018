import { expect } from "chai";
import { overlap } from "./day3";

describe('Claims (day 2)', function () {
  describe('overlap', function () {
    it('should sum the overlapping fabric', () => {
      expect(overlap([
        '#1 @ 1,3: 4x4',
        '#2 @ 3,1: 4x4',
        '#3 @ 5,5: 2x2',
      ])).to.equal(4);
    });
  });
});
