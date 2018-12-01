import { expect } from "chai";
import { totalSum, duplicatedSum } from "./day1";

describe('Frequency drift (day 1)', function () {
  describe('should sum up all frequencies', function () {
    it('case 1', () => {
      expect(totalSum(['+1','-2','+3','+1'])).to.equal(3);
    });
    it('case 2', () => {
      expect(totalSum(['+1','+1','+1'])).to.equal(3);
    });
    it('case 3', () => {
      expect(totalSum(['+1','+1','-2'])).to.equal(0);
    });
    it('case 4', () => {
      expect(totalSum(['-1','-2','-3'])).to.equal(-6);
    });
  });

  describe('should find first duplicate', function () {
    it('case 1', () => {
      expect(duplicatedSum(['+1','-2','+3','+1'])).to.equal(2);
    });
    it('case 2', () => {
      expect(duplicatedSum(['+1','-1'])).to.equal(0);
    });
    it('case 3', () => {
      expect(duplicatedSum(['+3','+3','+4','-2','-4'])).to.equal(10);
    });
    it('case 4', () => {
      expect(duplicatedSum(['-6','+3','+8','+5','-6'])).to.equal(5);
    });
    it('case 5', () => {
      expect(duplicatedSum(['+7','+7','-2','-7','-4'])).to.equal(14);
    });
  });
});
