const { expect } = require("chai");
const { solveA, solveB } = require("./x");

describe("Day X", function () {
    context("helpers", function () {
      
    });

    context("A", function () {
        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(0);
        });
    });

    context("B", function () {
        specify("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(0);
        });
    });
})