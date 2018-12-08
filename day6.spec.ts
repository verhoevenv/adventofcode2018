import {expect} from "chai";
import {areaCloserThan, largestArea} from "./day6";

describe('Coordinates (day 6)', function () {
  describe('largest area', function () {
    it('example', () => {
      expect(largestArea([
        [1, 1],
        [1, 6],
        [8, 3],
        [3, 4],
        [5, 5],
        [8, 9],
      ])).to.equal(17);
    });
  });
  describe('area of region with close locations', function () {
    it('example', () => {
      expect(areaCloserThan(32, [
        [1, 1],
        [1, 6],
        [8, 3],
        [3, 4],
        [5, 5],
        [8, 9],
      ])).to.equal(16);
    });
  });
});
