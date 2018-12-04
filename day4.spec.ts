import {expect} from "chai";
import {strategy1, strategy2} from "./day4";

describe('Sleeping (day 4)', function () {
  let log = [
    '[1518-11-01 00:00] Guard #10 begins shift',
    '[1518-11-01 00:05] falls asleep',
    '[1518-11-01 00:25] wakes up',
    '[1518-11-01 00:30] falls asleep',
    '[1518-11-01 00:55] wakes up',
    '[1518-11-01 23:58] Guard #99 begins shift',
    '[1518-11-02 00:40] falls asleep',
    '[1518-11-02 00:50] wakes up',
    '[1518-11-03 00:05] Guard #10 begins shift',
    '[1518-11-03 00:24] falls asleep',
    '[1518-11-03 00:29] wakes up',
    '[1518-11-04 00:02] Guard #99 begins shift',
    '[1518-11-04 00:36] falls asleep',
    '[1518-11-04 00:46] wakes up',
    '[1518-11-05 00:03] Guard #99 begins shift',
    '[1518-11-05 00:45] falls asleep',
    '[1518-11-05 00:55] wakes up',
  ];
  describe('strategy 1', function () {
    it('should pick the guard with most minutes asleep', () => {
      expect(strategy1(log)).to.equal(240);
    });
  });
  describe('strategy 2', function () {
    it('should pick the guard with most minutes asleep on same minute', () => {
      expect(strategy2(log)).to.equal(4455);
    });
  });
});
