const { expect } = require("chai");
const { solveA, solveB, boardingPass } = require("./5");

describe("Day 5", function () {
    context("helpers", function () {
        specify("boarding pass", function () {
            const examples = [
                ["FBFBBFFRLR", 357],
                ["BFFFBBFRRR", 567],
                ["FFFBBBFRRR", 119],
                ["BBFFBBFRLL", 820],
            ];
            examples.forEach(([pass, expected]) => {
                expect(boardingPass(pass)).to.deep.equal(expected);
            });
        });
    });

    context("A", function () {
        specify("solution", function () {
            const result = solveA(`${__dirname}/../input.txt`);
            console.log(result);
            expect(result).to.equal(974);
        });
    });

    context("B", function () {
        specify("solution", function () {
            const result = solveB(`${__dirname}/../input.txt`);
            console.log(result);
            expect(result).to.equal(646);
        });
    });
})