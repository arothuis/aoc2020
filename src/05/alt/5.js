const { linesFromFile } = require("../../core");

const halfRange = (a, b) => Math.round((b - a) / 2);

const lowerHalf = ([a, b]) => [a, b - halfRange(a, b)];
const upperHalf = ([a, b]) => [a + halfRange(a, b), b];

const parseRow = (range, letter) => 
    letter === "F" ? lowerHalf(range) : upperHalf(range);
const parseColumn = (range, letter) =>
    letter === "R" ? upperHalf(range) : lowerHalf(range);

const findSeatRow = p => p.split("").slice(0, 7).reduce(parseRow, [0, 127])[0];
const findSeatColumn = p => p.split("").slice(7).reduce(parseColumn, [0, 7])[0]

const boardingPass = p => (
    row = findSeatRow(p), 
    column = findSeatColumn(p), 
    id = row * 8 + column,
    [row, column, id]
);

const solveA = path => 
    linesFromFile(path)
        .map(x => boardingPass(x)[2])
        .reduce((max, id) => id > max ? id : max, 0);

const solveB = path => 
    linesFromFile(path)
        .map(x => boardingPass(x)[2])
        .sort((a, b) => a - b)
        .filter((id, i, ids) => ids[i + 1] !== id + 1)[0] 
        + 1

module.exports =  {
    lowerHalf,
    upperHalf,
    boardingPass,
    solveA,
    solveB,
};