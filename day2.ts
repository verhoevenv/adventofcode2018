import { DaySolution } from "./run-on-input";

export function checksum(ids: string[]) {
    let twos = 0;
    let threes = 0;
    for (let id of ids) {
        const counts = characterCounts(id);
        if (hasCountOf(counts, 2)) twos += 1;
        if (hasCountOf(counts, 3)) threes += 1;
    }

    return twos * threes;
}

type CharCount = { [x: string]: number };
function characterCounts(word: string): CharCount {
    let counts: CharCount = {};
    for (let char of word) {
        counts[char] = (counts[char] || 0) + 1
    }
    return counts;
}

function hasCountOf(counts: CharCount, n: number) {
    for (let char in counts) {
        if (counts[char] === n) {
            return true;
        }
    }
    return false;
}

export function matchingBoxes(ids: string[]): string {
    for (let firstIdx = 0; firstIdx < ids.length; firstIdx++) {
        for (let secondIdx = firstIdx + 1; secondIdx < ids.length; secondIdx++) {
            const diff = almostMatch(ids[firstIdx], ids[secondIdx]);
            if(diff) {
                return diff;
            }
        }
    }
    throw 'No matching boxes found';
}

function almostMatch(first: string, second: string) : string | false {
    let firstDifferenceFoundOn = -1;
    for (let idx = 0; idx < first.length;  idx++) {
        if (first[idx] !== second[idx]) {
            if (firstDifferenceFoundOn !== -1) {
                return false;
            } else {
                firstDifferenceFoundOn = idx;
            }
        }
    }
    if(firstDifferenceFoundOn === -1) {
        throw 'Exact matches found';
    }
    return first.substring(0, firstDifferenceFoundOn) + first.substr(firstDifferenceFoundOn + 1);
}

export const solution: DaySolution = {
    part1: (input: string) => checksum(input.split('\n')),
    part2: (input: string) => matchingBoxes(input.split('\n'))
};
