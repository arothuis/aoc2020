const { readFileSync } = require("fs");

const linesFromFile = (path, delim = "\n") =>
    readFileSync(path, "utf-8").split(delim);
const numbersFromFile = (path, delim = "\n", base = 10) => 
    linesFromFile(path, delim).map(n => parseInt(n, base)); 

const combinations = xs => xs.flatMap(x => xs.map(y => [x, y]));

module.exports = {
    linesFromFile,
    numbersFromFile,
    combinations,
};