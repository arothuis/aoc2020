const { expect } = require("chai");
const { solveA, solveB, lowerHalf, upperHalf, boardingPass } = require("./5");

describe("Day 5", function () {
    context("helpers", function () {
        specify("lower half", function () {
            const examples = [
                [[0, 127], [0, 63]],
                [[32, 63], [32, 47]],
                [[4, 7], [4, 5]],
                [[44, 47], [44, 45]],
                [[44, 45], [44, 44]],
            ];
            examples.forEach(([start, expected]) => {
                expect(lowerHalf(start)).to.deep.equal(expected);
            });
        });
        
        specify("upper half", function () {
            const examples = [
                [[0, 63], [32, 63]],
                [[32, 47], [40, 47]],
            ];
            examples.forEach(([start, expected]) => {
                expect(upperHalf(start)).to.deep.equal(expected);
            });
        });

        specify("boarding pass", function () {
            const examples = [
                ["FBFBBFFRLR", [44, 5, 357]],
                ["BFFFBBFRRR", [70, 7, 567]],
                ["FFFBBBFRRR", [14, 7, 119]],
                ["BBFFBBFRLL", [102, 4, 820]],
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