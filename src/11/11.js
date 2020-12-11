// Possible refactoring: use flat array instead of nested array for grid implementation
// Interesting experiment for later: try out a (windowed) bitboard implementation
const { linesFromFile } = require("../core.js");

const DIRECTIONS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1,-1], [1, 0], [1, 1]];

const getSpot = (spots, x, y) => spots[y] ? spots[y][x] : undefined;
const getNearestSeat = (spots, x, y, dx, dy) => {
    const spot = getSpot(spots, x, y);
    return spot !== "." ? spot : getNearestSeat(spots, x + dx, y + dy, dx, dy);
};

const countCloseAdjacent = (spots, x, y) => DIRECTIONS
    .reduce((count, [dx, dy]) => getSpot(spots, x + dx, y + dy) === "#" ? count + 1 : count, 0);
const countFarAdjacent = (spots, x, y) => DIRECTIONS
    .reduce((count, [dx, dy]) => getNearestSeat(spots, x + dx, y + dy, dx, dy) === "#" ? count + 1 : count, 0);

const evolve = (spots, x, y, maxAdjacent, countAdjacent) => {
    const spot = getSpot(spots, x, y);
    const adjacent = countAdjacent(spots, x, y);

    return spot === "L" && adjacent === 0 ? "#" :
        spot === "#" && adjacent > maxAdjacent ? "L" : spot;
};
const nextStep = (maxAdjacent, countAdjacent) => (spots) => 
    spots.map((r, y) => r.map((_, x) => evolve(spots, x, y, maxAdjacent, countAdjacent)));

const run = (grid, step) => {
    const next = step(grid);
    return next.toString() === grid.toString() ? next : run(next, step);
};

const solve = (path, maxAdjacent, countAdjacent) => {
    const grid = linesFromFile(path).map(l => l.split(""));
    return run(grid, nextStep(maxAdjacent, countAdjacent)).flat().filter(s => s === "#").length;
};

module.exports =  {
    evolve,
    nextStep,
    countCloseAdjacent,
    countFarAdjacent,
    solve,
};