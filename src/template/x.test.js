const { expect } = require("chai");
const { solveA, solveB } = require("./x");

describe("Day template", function () {
    context("helpers", function () {
      
    });

    context.skip("A", function () {
        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(0);
        });
    });

    context.skip("B", function () {
        specify("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(0);
        });
    });
})