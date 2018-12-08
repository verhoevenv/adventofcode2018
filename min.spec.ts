import {expect} from "chai";
import {maximalBy, minimalBy} from "./min";

describe('Minimal By', function () {
  it('should return the minimal value', () => {
    expect(minimalBy([
      'abc',
      'a',
      'abcde',
    ], (s) => s.length)).to.deep.equal([['a'], 1]);
  });
  it('should return multiple values if multiple are minimal', () => {
    expect(minimalBy([
      'abc',
      'a',
      'abcde',
      'c',
    ], (s) => s.length)).to.deep.equal([['a', 'c'], 1]);
  });
});


describe('Maximal By', function () {
  it('should return the maximal value', () => {
    expect(maximalBy([
      'abc',
      'a',
      'abcde',
    ], (s) => s.length)).to.deep.equal([['abcde'], 5]);
  });
  it('should return multiple values if multiple are maximal', () => {
    expect(maximalBy([
      'abc',
      'abcde',
      'a',
      'edcba',
    ], (s) => s.length)).to.deep.equal([['abcde', 'edcba'], 5]);
  });
});
