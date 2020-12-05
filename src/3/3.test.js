const { expect } = require("chai");
const { parseLand, getPath, plot, countTreesOnPath, solveA, solveB } = require("./3");

describe("Day 3", function () {
    context("helpers", function () {
        specify("parse land", function () {
            const data = "...#\n#...\n.#.#";
            const expected = [
                [".", ".", ".", "#"],
                ["#", ".", ".", "."],
                [".", "#", ".", "#"],
            ];
            expect(parseLand(data)).to.deep.equal(expected);
        }); 

        specify("get path from land by coords", function () {
            const land = [
                ["#", ".", "."],
                [".", ".", "#"],
                ["#", ".", "."],
            ];
            const coords = [[0, 0], [1, 1], [2, 2]];
            const expected = ["#", ".", "."];
            expect(getPath(land, coords)).to.deep.equal(expected);
        });

        specify("get path from land by coords with wrapping if x coordinate outside range", function () {
            const land = [
                ["#", "."],
                [".", "."],
                ["#", "."],
            ];
            const coords = [[0, 0], [1, 1], [2, 2]];
            const expected = ["#", ".", "#"];
            expect(getPath(land, coords)).to.deep.equal(expected);
        });

        specify("plot a path of coords", function () {
            const path = x => x * 2;
            const expected = [[0,0], [1,2], [2,4]];
            expect(plot(path, 3)).to.deep.equal(expected);
        });

        specify("count trees on path", function () {
            const land = [
                ["#", "."],
                [".", "."],
                ["#", "."],
            ];
            const coords = [[0, 0], [1, 1], [2, 2]];
            expect(countTreesOnPath(land, coords)).to.equal(2);
        });
    });

    context("A", function () {
        specify("example", function () {
            expect(solveA(`${__dirname}/example.txt`)).to.equal(7);
        });

        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(244);
        });
    });

    context("B", function () {
        specify("example", function () {
            expect(solveB(`${__dirname}/example.txt`)).to.equal(336);
        });

        specify("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(9406609920);
        });
    });
})