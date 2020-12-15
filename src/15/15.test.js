const { expect } = require("chai");
const { solve } = require("./15");

describe("Day 15", function () {
    context("A", function () {
        specify("example 1", function () {
            const result = solve(`${__dirname}/example1.txt`, 10);
            expect(result).to.equal(0);
        });
        specify("solution", function () {
            const result = solve(`${__dirname}/input.txt`, 2020);
            console.log(result);
            expect(result).to.equal(1194);
        });
    });

    context.skip("B", function () {
        specify("solution", function () {
            const result = solve(`${__dirname}/input.txt`, 30000000);
            console.log(result);
            expect(result).to.equal(48710);
        });
    });
})