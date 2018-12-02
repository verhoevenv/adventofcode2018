import { DaySolution } from "./run-on-input";

export function checksum(ids: string[]) {
    let twos = 0;
    let threes = 0;
    for(let id of ids) {
        const counts = characterCounts(id);
        if(hasCountOf(counts, 2)) twos += 1;
        if(hasCountOf(counts, 3)) threes += 1;
    }
    
    return twos * threes;
}

type CharCount =  {[x: string] : number};
function characterCounts(word: string): CharCount {
    let counts : CharCount = {};
    for(let char of word) {
        counts[char] = (counts[char] || 0) + 1
    }
    return counts;
}

function hasCountOf(counts: CharCount, n: number) {
    for (let char in counts) {
        if(counts[char] === n){
            return true;
        }
    }
    return false;
}

export const solution: DaySolution = {
    part1: (input: string) => checksum(input.split('\n')),
    part2: (input: string) => null
}
