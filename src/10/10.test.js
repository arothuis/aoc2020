const { expect } = require("chai");
const { solveA, solveB } = require("./10");

describe("Day 10", function () {
    context("helpers", function () {
        specify("find missing sum", function () {
            const examples = [
                [[1, 2, 3, 5, 6, 7], 2, 6],
                [[1, 2, 3, 4, 5, 10], 3, 10],
                [[1, 2, 3, 5, 8], 2, null]
            ];
            examples.forEach(([numbers, lookback, expected]) => {
                
            });
        });
    });

    context("A", function () {
        specify("example 1", function () {
            const result = solveA(`${__dirname}/example1.txt`);
            console.log(result);
            expect(result).to.equal(35);
        });

        specify("example 2", function () {
            const result = solveA(`${__dirname}/example2.txt`);
            console.log(result);
            expect(result).to.equal(220);
        });

        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(1700);
        });
    });

    context("B", function () {
        specify("example 1", function () {
            const result = solveB(`${__dirname}/example1.txt`);
            expect(result).to.equal(8);
        });

        specify("example 2", function () {
            const result = solveB(`${__dirname}/example2.txt`);
            expect(result).to.equal(19208);
        });

        specify("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(12401793332096);
        });
    });
})