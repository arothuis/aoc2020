const { linesFromFile } = require("../core");

const boardingPass = pass => 
    parseInt(pass.replace(/[FL]/g, "0").replace(/[BR]/g, "1"), 2);

const solveA = path => linesFromFile(path).map(boardingPass).reduce((a, b) => Math.max(a, b), 0);
const solveB = path => linesFromFile(path).map(boardingPass).sort((a, b) => a - b)
    .filter((id, i, ids) => ids[i + 1] !== id + 1)[0] + 1;

module.exports =  {
    boardingPass,
    solveA,
    solveB,
};