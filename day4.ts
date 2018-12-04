import {DaySolution} from "./run-on-input";
import {sortOn} from "./sortUtil";

export function strategy1(log: string[]) {
  let firstPassEvents = log.map(parseRawStrings);
  let orderedEvents = order(firstPassEvents);
  let eventsGroupedByDay = groupEvents(orderedEvents);
  let schedule = buildSchedule(eventsGroupedByDay);

  let guard = findMostSleepingGuard(schedule);
  let minute = findMostSleepingMinute(schedule, guard);
  return guard * minute;
}

export function strategy2(log: string[]) {
  let firstPassEvents = log.map(parseRawStrings);
  let orderedEvents = order(firstPassEvents);
  let eventsGroupedByDay = groupEvents(orderedEvents);
  let schedule = buildSchedule(eventsGroupedByDay);

  let [guard, minute] = findMostSleepingGuardOnOneMinute(schedule);
  return guard * minute;
}

function groupEvents(orderedEvents: Event[]) {
  let day = 'not a day yet';
  let groupings: { [date: string]: Event[] } = {};
  for (let event of orderedEvents) {
    if (event.whatHappened.type === 'GuardBegins') {
      day = determineDayFromBeginShiftEvent(event);
      groupings[day] = [event];
    } else {
      groupings[day] = [...groupings[day], event];
    }
  }
  return groupings;
}

function determineDayFromBeginShiftEvent(event: Event) {
  if (event.whatHappened.type !== "GuardBegins") throw `Wrong event! ${event}`;
  if (event.hour === 0) {
    return `${event.month}-${event.day}`;
  } else {
    return `${event.month}-${event.day + 1}`;
  }
}

function buildSchedule(eventsByDay: { [day: string]: Event[] }): Schedule {
  let schedule: Schedule = {};

  for (let day in eventsByDay) {
    let events: Event[] = eventsByDay[day];
    let [firstEventOfDay, ...otherEvents] = events;
    if (firstEventOfDay.whatHappened.type !== "GuardBegins") {
      throw `Wrong ordering, expected GuardBegins event but first event of day ${day} was ${firstEventOfDay}`;
    }

    let minute = 0;
    let daySchedule: DaySchedule = {};
    let guardAwake = true;
    for (let event of otherEvents) {
      if (guardAwake) {
        if (event.whatHappened.type !== "FallsAsleep") {
          throw `Wrong ordering, expected FallsAsleep event`;
        }
        daySchedule = fill(daySchedule, minute, event.minute, 'Awake');
        minute = event.minute;
        guardAwake = false;
      } else {
        if (event.whatHappened.type !== "WakesUp") {
          throw `Wrong ordering, expected WakesUp event`;
        }
        daySchedule = fill(daySchedule, minute, event.minute, 'Asleep');
        minute = event.minute;
        guardAwake = true;
      }
    }
    daySchedule = fill(daySchedule, minute, 60, guardAwake ? 'Awake' : 'Asleep');

    schedule[day] = {
      guard: firstEventOfDay.whatHappened.id,
      asleep: daySchedule
    }
  }

  return schedule;
}

function fill(daySchedule: DaySchedule, from: number, to: number, business: GuardBusiness) {
  let newSchedule = {...daySchedule};
  for (let minute = from; minute < to; minute++) {
    newSchedule[minute] = business;
  }
  return newSchedule;
}

function findMostSleepingGuard(schedule: Schedule): GuardID {
  let sleepTimes: { [guard: number]: number } = {};
  for (let scheduleKey in schedule) {
    let scheduleElement = schedule[scheduleKey];
    sleepTimes[scheduleElement.guard] =
      (sleepTimes[scheduleElement.guard] || 0)
      + totalInState(scheduleElement.asleep, 'Asleep');
  }

  let maxSleepy = -1;
  let mostSleepingGuard = undefined;
  for (let guard in sleepTimes) {
    let sleepTime = sleepTimes[guard];
    if (sleepTime > maxSleepy) {
      mostSleepingGuard = guard;
      maxSleepy = sleepTime;
    }
  }
  return parseInt(mostSleepingGuard);
}

function findMostSleepingMinute(schedule: Schedule, guard: GuardID) {
  let sleepTimes: { [minute: number]: number } = {};
  for (let scheduleKey in schedule) {
    let scheduleElement = schedule[scheduleKey];
    if (scheduleElement.guard === guard) {
      for (let asleepKey in scheduleElement.asleep) {
        if (scheduleElement.asleep[asleepKey] === 'Asleep') {
          sleepTimes[asleepKey] = (sleepTimes[asleepKey] || 0) + 1;
        }
      }
    }
  }

  let maxAmountSleep = -1;
  let mostSleepyMinute = undefined;
  for (let minute in sleepTimes) {
    let sleepTime = sleepTimes[minute];
    if (sleepTime > maxAmountSleep) {
      mostSleepyMinute = minute;
      maxAmountSleep = sleepTime;
    }
  }
  return parseInt(mostSleepyMinute);
}

function findMostSleepingGuardOnOneMinute(schedule: Schedule) {
  let sleepTimes: { [idx: string]: number } = {};
  for (let scheduleKey in schedule) {
    let scheduleElement = schedule[scheduleKey];
    let guardId = scheduleElement.guard;
    for (let minute in scheduleElement.asleep) {
      if (scheduleElement.asleep[minute] === 'Asleep') {
        let idx = `${guardId}-${minute}`;
        sleepTimes[idx] = (sleepTimes[idx] || 0) + 1;
      }
    }
  }

  let maxAmountSleep = -1;
  let mostSleepyMinute = undefined;
  for (let minute in sleepTimes) {
    let sleepTime = sleepTimes[minute];
    if (sleepTime > maxAmountSleep) {
      mostSleepyMinute = minute;
      maxAmountSleep = sleepTime;
    }
  }
  let match = /(\d+)-(\d+)/.exec(mostSleepyMinute);
  let guardId = parseInt(match[1]);
  let minute = parseInt(match[2]);
  return [guardId, minute];
}

type GuardBusiness =
  | 'Awake'
  | 'Asleep'

interface DaySchedule {
  [minute: number]: GuardBusiness
}

function totalInState(day: DaySchedule, business: GuardBusiness) {
  let count = 0;
  for (let minute in day) {
    if (day[minute] === business) {
      count++;
    }
  }
  return count;
}

interface Schedule {
  [date: string]: {
    guard: GuardID,
    asleep: DaySchedule
  }
}

function order(firstPassEvents: Event[]) {
  return firstPassEvents.slice().sort(sortOn(
    x => x.year,
    x => x.month,
    x => x.day,
    x => x.hour,
    x => x.minute,
  ));
}

type GuardID = number

type EventType =
  | { type: 'GuardBegins', id: GuardID }
  | { type: 'FallsAsleep' }
  | { type: 'WakesUp' }

interface Event {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  whatHappened: EventType
}

function parseRawStrings(logLine: string): Event {
  let match = /\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.+)/.exec(logLine);
  let eventString = match[6];
  let timeData = {
    year: parseInt(match[1]),
    month: parseInt(match[2]),
    day: parseInt(match[3]),
    hour: parseInt(match[4]),
    minute: parseInt(match[5]),
  };
  let beginShiftMatch = /Guard #(\S+) begins shift/.exec(eventString);
  if (beginShiftMatch) {
    return {
      ...timeData,
      whatHappened: {type: 'GuardBegins', id: parseInt(beginShiftMatch[1])}
    }
  }
  if (/falls asleep/.exec(eventString)) {
    return {
      ...timeData,
      whatHappened: {type: 'FallsAsleep'}
    }
  }
  if (/wakes up/.exec(eventString)) {
    return {
      ...timeData,
      whatHappened: {type: 'WakesUp'}
    }
  }
  throw `unmatched log line: ${logLine}`;
}

export const solution: DaySolution = {
  part1: (input: string) => strategy1(input.split("\n")),
  part2: (input: string) => strategy2(input.split("\n"))
};
