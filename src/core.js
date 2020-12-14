const { readFileSync } = require("fs");

const linesFromFile = (path, delim = "\n") =>
    readFileSync(path, "utf-8").split(delim);
const numbersFromFile = (path, delim = "\n", base = 10) => 
    linesFromFile(path, delim).map(n => parseInt(n, base)); 

const combinations = xs => xs.flatMap(x => xs.map(y => [x, y]));

const powerset = xs => {
    const ys = [[]];
    for (let i = 0; i < xs.length; i++) {
        for (let j = 0, len = ys.length; j < len; j++) {
            ys.push(ys[j].concat(xs[i]));
        }
    }
    return ys;
};


module.exports = {
    linesFromFile,
    numbersFromFile,
    combinations,
    powerset,
};