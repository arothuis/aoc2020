const { expect } = require("chai");
const { evolve, nextStep, countCloseAdjacent, countFarAdjacent, solve } = require("./11");

describe("Day 11", function () {
    context("helpers", function () {
        specify("evolve a seat in a grid of spots", function () {
            const examples = [
                ["LLL\nLLL\nLLL", [1, 1], 3, countCloseAdjacent, "#"],
                ["LLL\nL.L\nLLL", [1, 1], 3, countCloseAdjacent, "."],
                ["LLL\nL#L\nLLL", [1, 1], 3, countCloseAdjacent, "#"],
                ["LL#\n###\nL#L", [1, 1], 3, countCloseAdjacent, "L"],
                ["..L..\n.....\n..#..", [2, 0], 4, countFarAdjacent, "L"],
                ["..L..\n..L..\n..#..", [2, 0], 4, countFarAdjacent, "#"],
                ["..#..\n.....\n#.#.#", [2, 0], 3, countFarAdjacent, "#"],
            ];
            examples.forEach(([grid, [x, y], maxAdjacent, countAdjacent, expected]) => {
                const spots = grid.split("\n").map(x => x.split(""));
                const result = evolve(spots, x, y, maxAdjacent, countAdjacent);
                expect(result).to.equal(expected);
            });
        });

        specify("evolve grid", function () {
            const examples = [
                ["LLL\nLLL\nLLL", 3, countCloseAdjacent, "###\n###\n###", ],
            ];
            examples.forEach(([grid, maxAdjacent, countAdjacent, expected]) => {
                const spots = grid.split("\n").map(x => x.split(""));
                const result = nextStep(spots, maxAdjacent, countAdjacent);
                expect(result).to.deep.equal(expected.split("\n").map(x => x.split("")));
            });
        });

        specify("count nearest occupied seats", function () {
            const examples = [
                [
                    [".......#.",
                    "...#.....",
                    ".#.......",
                    ".........",
                    "..#L....#",
                    "....#....",
                    ".........",
                    "#........",
                    "...#....."].map(n => n.split("")),
                    [3, 4],
                    8
                ]
            ];
            examples.forEach(([grid, [x, y], expected]) => {
                const result = countFarAdjacent(grid, x, y);
                expect(result).to.equal(expected);
            });
        });
    });

    context("A", function () {
        specify("example", function () {
            const result = solve(`${__dirname}/example.txt`, 3, countCloseAdjacent);
            console.log(result);
            expect(result).to.equal(37);
        });

        specify("solution", function () {
            const result = solve(`${__dirname}/input.txt`, 3, countCloseAdjacent);
            console.log(result);
            expect(result).to.equal(2303);
        });
    });

    context("B", function () {
        specify("example", function () {
            const result = solve(`${__dirname}/example.txt`, 4, countFarAdjacent);
            expect(result).to.equal(26);
        });

        specify("solution", function () {
            const result = solve(`${__dirname}/input.txt`, 4, countFarAdjacent);
            console.log(result);
            expect(result).to.equal(2057);
        });
    });
})