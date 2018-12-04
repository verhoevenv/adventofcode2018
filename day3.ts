import { DaySolution } from "./run-on-input";

export function overlap(claimsStr: string[]) {
    const claims = claimsStr.map(parse);
    const fabric = calculateFabric(claims);
    return countOverlaps(fabric);
}

export function intact(claimsStr: string[]) {
    const claims = claimsStr.map(parse);
    const fabric = calculateFabric(claims);
    return findIntactClaim(fabric, claims);
}

type ClaimId = string;

type Fabric = {
    [position: string]: ClaimId[]
}

function calculateFabric(claims: Claim[]) {
    let fabric: Fabric = {};
    for (let claim of claims) {
        for (let x = claim.x; x < claim.x + claim.w; x++) {
            for (let y = claim.y; y < claim.y + claim.h; y++) {
                let idx = `${x},${y}`;
                let previousClaims = (fabric[idx] || []);
                fabric[idx] = [...previousClaims, claim.id];
            }
        }
    }
    return fabric;
}

function countOverlaps(fabric: Fabric) {
    let numOverlaps = 0;
    for (let position in fabric) {
        if (fabric[position].length > 1) {
            numOverlaps += 1;
        }
    }
    return numOverlaps;
}

function findIntactClaim(claimsOnFabric: Fabric, claims: Claim[]) {
    let intactClaimIds = new Set(claims.map(claim => claim.id));
    for (let position in claimsOnFabric) {
        if (claimsOnFabric[position].length > 1) {
            claimsOnFabric[position].forEach(
                claim => intactClaimIds.delete(claim)
            )
        }
    }
    if (intactClaimIds.size !== 1) {
        throw `Wrong amount of intact claims found in ${intactClaimIds}`
    }
    return [...intactClaimIds][0];
}

interface Claim {
    id: ClaimId,
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
    part2: (input: string) => intact(input.split('\n'))
};
