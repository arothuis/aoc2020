const { readFileSync } = require("fs");

const boardingPass = pass => 
    parseInt(pass.replace(/[FL]/g, "0").replace(/[BR]/g, "1"), 2);

const passList = path => readFileSync(path, "utf-8").split("\n").map(boardingPass);

const solveA = path => passList(path).reduce((a, b) => Math.max(a, b), 0);
const solveB = path => passList(path).sort((a, b) => a - b)
    .filter((id, i, ids) => ids[i + 1] !== id + 1)[0] + 1;

module.exports =  {
    boardingPass,
    solveA,
    solveB,
};