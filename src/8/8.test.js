const { expect } = require("chai");
const { solveA, solveB } = require("./8");

describe("Day 8", function () {
    context("A", function () {
        specify("example", function () {
            const result = solveA(`${__dirname}/example.txt`);
            console.log(result);
            expect(result.acc).to.equal(5);
        });

        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result.acc).to.equal(1586);
            expect(result.term).to.equal(false);
        });
    });

    context("B", function () {
        specify("example (termination)", function () {
            const result = solveA(`${__dirname}/example-fixed.txt`);
            expect(result.acc).to.equal(8);
            expect(result.term).to.equal(true);
        });

        specify("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result.acc);
            expect(result.acc).to.equal(703);
        });
    });
})