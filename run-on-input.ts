import * as fs from 'fs';

/**
 * Takes input file content exactly as downloaded from the website,
 * returns solution as should be pasted into the website
 */
export type ProblemSolution = (input: string) => unknown

export interface DaySolution {
    part1: ProblemSolution;
    part2: ProblemSolution;
}

async function run(moduleForDay: string, part: 'part1' | 'part2', inputFile: string = 'input.txt') {
    const input = fs.readFileSync(inputFile, 'utf8');
    const loadedModule = await import(moduleForDay);
    const solutions: DaySolution = loadedModule.solution
    const output = solutions[part](input);
    console.log(output);
}

run('./day1', 'part1');
