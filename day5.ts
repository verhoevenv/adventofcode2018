import {DaySolution} from "./run-on-input";

export function react(polymer: string) {
  let currentPolymer = polymer;
  let changes = true;
  while (changes) {
    [changes, currentPolymer] = reactFully(currentPolymer);
  }

  return currentPolymer.length;
}

export function improveAndReact(polymer: string) {
  const letters = Array.from({length: 26}, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));
  let minSeenLength = Number.MAX_SAFE_INTEGER;
  for (let letter of letters) {
    let improvedPolymer = polymer.split(letter).join('').split(letter.toLowerCase()).join('');
    let lengthAfterReaction = react(improvedPolymer);
    if (lengthAfterReaction < minSeenLength) {
      minSeenLength = lengthAfterReaction;
    }
  }
  return minSeenLength;
}

function reactFully(originalPolymer: string): [boolean, string] {
  let changes = false;
  let newPolymer = [];
  for (let idx = 0; idx < originalPolymer.length; idx++) {
    let unit = originalPolymer[idx];
    let nextUnit = originalPolymer[idx + 1];
    if (shouldReact(unit, nextUnit)) {
      changes = true;
      idx += 1;
    } else {
      newPolymer.push(originalPolymer[idx]);
    }
  }
  return [changes, newPolymer.join('')];
}

function shouldReact(unit1: string, unit2: string) {
  if (unit2 === undefined) return false;
  if (!isSameUnitType(unit1, unit2)) return false;
  return isPolarityUp(unit1) !== isPolarityUp(unit2);
}

function isSameUnitType(unit1: string, unit2: string) {
  return unit1.toUpperCase() === unit2.toUpperCase();
}

function isPolarityUp(unit: String) {
  return unit === unit.toUpperCase();
}

export const solution: DaySolution = {
  part1: (input: string) => react(input),
  part2: (input: string) => improveAndReact(input)
};
