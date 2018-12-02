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

async function run(
    moduleForDay: string,
    part: 'part1' | 'part2' | 'both' = 'both',
    inputFile: string = 'input.txt'
) {
    const input = fs.readFileSync(inputFile, 'utf8');
    const loadedModule = await import(`./${moduleForDay}`);
    const solutions: DaySolution = loadedModule.solution
    if (part === 'both') {
        console.log(solutions['part1'](input));
        console.log(solutions['part2'](input));
    } else {
        console.log(solutions[part](input));
    }
}

const args = process.argv.slice(2);
if (args[0] && args[1]) {
    run(args[0], <any>args[1]);
} else if (args[0]) {
    run(args[0]);
} else {
    console.log('usage: npm run grab-star <day> <part>');
    console.log('  <day> is the modulename (like "day1")');
    console.log('  <part> is "part1", "part2" or "both" (optional, default="both")');
}
