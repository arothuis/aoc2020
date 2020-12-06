const { numbersFromFile } = require("../core");

const permutations = xs => xs.flatMap(x => xs.map(y => [x, y]));
const expenseReportA = path => 
    permutations(numbersFromFile(path))
        .filter(([a, b]) => a + b === 2020)
        .map(([a, b]) => a * b)[0];

// Would like a more functional approach...
const expenseReportB = path => {
    const numbers = numbersFromFile(path);
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
    expenseReportA,
    expenseReportB,
};