import {DaySolution} from "./run-on-input";
import {maximalBy, minimalBy} from "./min";
import {sortOn} from "./sortUtil";

type Coordinate = [number, number];

export function largestArea(coordinates: Coordinate[]) {
  const gridSize = determineNeededSize(coordinates);
  const distanceGrids = coordinates.map((coor, idx) => createDistanceGrid(idx, gridSize, coor));
  const closestGrid = mergeGrids(distanceGrids);
  return largestNonInfiniteArea(closestGrid);
}

type GridSize = [number, number];

function determineNeededSize(coordinates: Coordinate[]): GridSize {
  let maxX = -1;
  let maxY = -1;

  for (let coordinate of coordinates) {
    if (coordinate[0] > maxX) maxX = coordinate[0];
    if (coordinate[1] > maxY) maxY = coordinate[1];
  }

  return [maxX, maxY];
}

type GridId = number;
type SerializedCoordinate = string;
type Distance = number;
type DistanceGrid = {
  id: GridId,
  distance: Map<SerializedCoordinate, Distance>,
  size: GridSize
};

function createDistanceGrid(id: GridId, gridSize: GridSize, origin: Coordinate) {
  let grid = {
    id: id,
    distance: new Map(),
    size: gridSize
  };
  let toFill: { coordinate: Coordinate, distance: Distance }[] = [];

  toFill.push({coordinate: origin, distance: 0});
  while (toFill.length > 0) {
    let {coordinate, distance} = toFill.shift();
    let coorAsString = serializeCoordinate(coordinate);
    if (outOfBounds(coordinate, grid.size)) continue;
    if (grid.distance.has(coorAsString) && grid.distance.get(coorAsString) <= distance) continue;
    grid.distance.set(coorAsString, distance);

    toFill.push({coordinate: [coordinate[0] - 1, coordinate[1]], distance: distance + 1});
    toFill.push({coordinate: [coordinate[0] + 1, coordinate[1]], distance: distance + 1});
    toFill.push({coordinate: [coordinate[0], coordinate[1] - 1], distance: distance + 1});
    toFill.push({coordinate: [coordinate[0], coordinate[1] + 1], distance: distance + 1});
  }
  return grid;
}

function serializeCoordinate(coordinate: Coordinate) {
  return `${coordinate}`;
}

function outOfBounds(coordinate: Coordinate, size: GridSize) {
  if (coordinate[0] < 0) return true;
  if (coordinate[1] < 0) return true;
  if (coordinate[0] > size[0]) return true;
  if (coordinate[1] > size[1]) return true;
  return false;
}

type ClosestGrid = {
  closest: Map<SerializedCoordinate, GridId>,
  size: GridSize
};

function mergeGrids(grids: DistanceGrid[]): ClosestGrid {
  let result: ClosestGrid = {
    closest: new Map(),
    size: grids[0].size
  };

  for (let x = 0; x < result.size[0]; x++) {
    for (let y = 0; y < result.size[1]; y++) {
      let coorAsString = serializeCoordinate([x, y]);
      let [nearest] = minimalBy(grids, (grid => grid.distance.get(coorAsString)));
      if (nearest.length === 1) {
        result.closest.set(coorAsString, nearest[0].id);
      }
    }
  }

  return result;
}

function largestNonInfiniteArea(grid: ClosestGrid) {
  let areaSizes = new Map<GridId, number>();
  for (let id of grid.closest.values()) {
    areaSizes.set(id, (areaSizes.get(id) || 0) + 1);
  }

  for (let x = 0; x < grid.size[0]; x++) {
    areaSizes.delete(grid.closest.get(serializeCoordinate([x, 0])));
    areaSizes.delete(grid.closest.get(serializeCoordinate([x, grid.size[1]])));
  }
  for (let y = 0; y < grid.size[1]; y++) {
    areaSizes.delete(grid.closest.get(serializeCoordinate([0, y])));
    areaSizes.delete(grid.closest.get(serializeCoordinate([grid.size[0], y])));
  }

  return maximalBy(areaSizes.entries(), x => x[1])[1];
}

export const solution: DaySolution = {
  part1: (input: string) => largestArea(input.split("\n").map(parsePairs)),
  part2: (input: string) => null
};

function parsePairs(line: string): [number, number] {
  let match = /(\d+), (\d+)/.exec(line);
  return [parseInt(match[1]), parseInt(match[2])];
}