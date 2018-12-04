import {expect} from "chai";
import {sortOn} from "./sortUtil";

describe('Sort Utils', function () {
  describe('sortOn', function () {
    it('should be able to sort on the given attribute', () => {
      let sorter = sortOn<string>(x => x.length);
      expect([
        'abc',
        'ab',
        'abcde',
        ''
      ].slice().sort(sorter)).to.deep.equal([
        '',
        'ab',
        'abc',
        'abcde'
      ]);
    });
    it('should be able to sort on multiple attributes', () => {
      let sorter = sortOn<string>(
        x => x.length,
        x => x.charCodeAt(0)

      );
      expect([
        'abc',
        'ab',
        'dba',
        'cba'
      ].slice().sort(sorter)).to.deep.equal([
        'ab',
        'abc',
        'cba',
        'dba'
      ]);
    });
  });
});
