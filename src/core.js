const { readFileSync } = require("fs");

const linesFromFile = (path, delim = "\n") =>
    readFileSync(path, "utf-8").split(delim);
const numbersFromFile = (path, delim = "\n", base = 10) => 
    linesFromFile(path, delim).map(n => parseInt(n, base)); 

module.exports = {
    linesFromFile,
    numbersFromFile,
};