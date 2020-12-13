const { expect } = require("chai");
const { solveA, solveB } = require("./13");

describe("Day 13", function () {
    context("helpers", function () {
        
    });

    context("A", function () {
        specify("example", function () {
            const result = solveA(`${__dirname}/example.txt`);
            console.log(result);
            expect(result).to.equal(295);
        });

        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(4782);
        });
    });

    context("B", function () {
        specify("example", function () {
            const result = solveB(`${__dirname}/example.txt`);
            expect(result).to.equal(1068781);
        });

        specify("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(1118684865113056);
        });
    });
})