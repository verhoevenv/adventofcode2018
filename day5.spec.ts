import {expect} from "chai";
import {improveAndReact, react} from "./day5";

describe('Polymers (day 5)', function () {
  describe('units after reaction', function () {
    it('example 1', () => {
      expect(react('aA')).to.equal(0);
    });
    it('example 2', () => {
      expect(react('abBA')).to.equal(0);
    });
    it('example 3', () => {
      expect(react('abAB')).to.equal(4);
    });
    it('example 4', () => {
      expect(react('aabAAB')).to.equal(6);
    });
    it('example 5', () => {
      expect(react('dabAcCaCBAcCcaDA')).to.equal(10);
    });
  });
  describe('units after reaction with improved polymer', function () {
    it('example', () => {
      expect(improveAndReact('dabAcCaCBAcCcaDA')).to.equal(4);
    });
  });
});
