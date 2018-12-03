import { DaySolution } from "./run-on-input";

export function overlap(claimsStr: string[]) {
    const claims = claimsStr.map(parse);
    const fabric = calculateFabric(claims);
    return countOverlaps(fabric);
}

type Fabric = {
    [position: string]: number
}

function calculateFabric(claims: Claim[]) {
    let fabric: Fabric = {};
    for (let claim of claims) {
        for (let x = claim.x; x < claim.x + claim.w; x++) {
            for (let y = claim.y; y < claim.y + claim.h; y++) {
                let idx = `${x},${y}`;
                fabric[idx] = (fabric[idx] || 0) + 1                    
            }    
        }
    }
    return fabric;
}

function countOverlaps(fabric: Fabric) {
    let numOverlaps = 0;
    for (let position in fabric) {
        if (fabric[position] > 1) {
            numOverlaps += 1;
        }
    }
    return numOverlaps;
}

interface Claim {
    id: string,
    x: number,
    y: number,
    w: number,
    h: number
}

function parse(claim: string): Claim {
    let match = /#(\S+) @ (\d+),(\d+): (\d+)x(\d+)/.exec(claim);
    return {
        id: match[1],
        x: parseInt(match[2]),
        y: parseInt(match[3]),
        w: parseInt(match[4]),
        h: parseInt(match[5])
    }
}

export const solution: DaySolution = {
    part1: (input: string) => overlap(input.split('\n')),
    part2: (input: string) => null
}
