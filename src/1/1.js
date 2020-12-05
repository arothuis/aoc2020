const { readFileSync } = require("fs");

const readNumbersFromFile = path => 
    readFileSync(path, "utf-8").split("\n").map(n => parseInt(n, 10));
const permutations = xs => xs.flatMap(x => xs.map(y => [x, y]));

const expenseReportA = path => 
    permutations(readNumbersFromFile(path))
        .filter(([a, b]) => a + b === 2020)
        .map(([a, b]) => a * b)[0];

// Would like a more functional approach...
const expenseReportB = path => {
    const numbers = readNumbersFromFile(path);
    
    for (let a of numbers) {
        for (let b of numbers) {
            for (let c of numbers) {
                if (a + b + c === 2020) {
                    return a * b * c;
                }
            }
        }
    }
};

module.exports = {
    readNumbersFromFile,
    expenseReportA,
    expenseReportB,
};