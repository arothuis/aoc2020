const { linesFromFile } = require("../core.js");

const DIRECTIONS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1,-1], [1, 0], [1, 1]];
const getSpot = (spots, x, y) => spots[y] ? spots[y][x] : undefined;
const isEmpty = s => s === "L";
const isOccupied = s => s === "#";
const countDirectlyAdjacent = (spots, x, y) => DIRECTIONS
    .reduce((count, [dx, dy]) => isOccupied(getSpot(spots, x + dx, y + dy)) ? count + 1 : count, 0);

const isFloor = s => s === ".";
const getNearestSeat = (spots, x, y, dx, dy) => {
    const spot = getSpot(spots, x, y);
    return !isFloor(spot) ? spot : getNearestSeat(spots, x + dx, y + dy, dx, dy);
};
const countFarAdjacent = (spots, x, y) => DIRECTIONS
    .reduce((count, [dx, dy]) => isOccupied(getNearestSeat(spots, x + dx, y + dy, dx, dy)) ? count + 1 : count, 0)

const evolve = (spots, x, y) => {
    const spot = getSpot(spots, x, y);
    const adjacent = countDirectlyAdjacent(spots, x, y);

    if (isEmpty(spot) && adjacent === 0) {
        return "#";
    }

    if (isOccupied(spot) && adjacent > 3) {
        return "L";
    }

    return spot;
};

const evolveB = (spots, x, y) => {
    const spot = getSpot(spots, x, y);
    const adjacent = countFarAdjacent(spots, x, y);

    if (isEmpty(spot) && adjacent === 0) {
        return "#";
    }

    if (isOccupied(spot) && adjacent > 4) {
        return "L";
    }

    return spot;
};

const nextStep = spots => spots.map((r, y) => r.map((_, x) => evolve(spots, x, y)));
const nextStepB = spots => spots.map((r, y) => r.map((_, x) => evolveB(spots, x, y)));
const stringGrid = spots => spots.map(r => r.join("")).join("\n");

const solveA = path => {
    const grid = linesFromFile(path).map(l => l.split(""));
    let previous = grid;
    let next = nextStep(previous);

    while (stringGrid(next) !== stringGrid(previous)) {
        previous = next;
        next = nextStep(previous);
    }

    return next.flat().filter(isOccupied).length;
};
const solveB = path => {
    const grid = linesFromFile(path).map(l => l.split(""));
    let previous = grid;
    let next = nextStepB(previous);

    while (stringGrid(next) !== stringGrid(previous)) {
        previous = next;
        next = nextStepB(previous);
    }

    return next.flat().filter(isOccupied).length;
};
module.exports =  {
    evolve,
    nextStep,
    countFarAdjacent,
    solveA,
    solveB,
};