import { DaySolution } from "./run-on-input";

export function totalSum(changesAsStr: string[]) {
    const numbers = changesAsStr.map((x) => parseInt(x));
    return numbers.reduce((acc, next) => acc + next, 0);
}

export function duplicatedSum(changesAsStr: string[]) {
    const numbers = changesAsStr.map((x) => parseInt(x));

    let sumsSeen = [0];
    let duplicateFound = false;
    let currentIdx = 0;
    let frequency = 0;
    while(!duplicateFound) {
        frequency += numbers[currentIdx];
        if(sumsSeen.includes(frequency)) {
            duplicateFound = true;
        } else {
            sumsSeen.push(frequency);
        }
        currentIdx = (currentIdx + 1) % numbers.length;
    }

    return frequency;
}

export const solution: DaySolution = {
    part1: (input: string) => totalSum(input.split('\n')),
    part2: (input: string) => duplicatedSum(input.split('\n'))
};
