const { expect } = require("chai");
const { MOVES_A, MOVES_B, solve } = require("./12");

describe("Day 12", function () {
    context("helpers", function () {
        specify("moves A", function () {
            const examples = [
                [[0, 0, "E"], MOVES_A.L(90), [0, 0, "N"]],
                [[0, 0, "E"], MOVES_A.L(180), [0, 0, "W"]],
                [[0, 0, "E"], MOVES_A.L(270), [0, 0, "S"]],
                [[0, 0, "E"], MOVES_A.L(360), [0, 0, "E"]],
                [[0, 0, "E"], MOVES_A.R(90), [0, 0, "S"]],
                [[0, 0, "E"], MOVES_A.R(180), [0, 0, "W"]],
                [[0, 0, "E"], MOVES_A.R(270), [0, 0, "N"]],
                [[0, 0, "E"], MOVES_A.R(360), [0, 0, "E"]],
                [[0, 0, "E"], MOVES_A.F(10), [10, 0, "E"]],
                [[0, 0, "E"], MOVES_A.NESW(10, "N"), [0, 10, "E"]],
                [[0, 0, "E"], MOVES_A.NESW(10, "E"), [10, 0, "E"]],
                [[0, 0, "E"], MOVES_A.NESW(10, "S"), [0, -10, "E"]],
                [[0, 0, "E"], MOVES_A.NESW(10, "W"), [-10, 0, "E"]],
            ];
            examples.forEach(([current, move, expected]) => {
                const result = move(current);
                expect(result).to.deep.equal(expected);
            });
        });
    });

    context("A", function () {
        specify("example", function () {
            const result = solve(`${__dirname}/example.txt`, MOVES_A, [0, 0, "E"]);
            console.log(result);
            expect(result).to.equal(25);
        });

        specify("solution", function () {
            const result = solve(`${__dirname}/input.txt`, MOVES_A, [0, 0, "E"]);
            console.log(result);
            expect(result).to.equal(1533);
        });
    });

    context("B", function () {
        specify("example", function () {
            const result = solve(`${__dirname}/example.txt`, MOVES_B, [0, 0, 10, 1]);
            expect(result).to.equal(286);
        });

        specify("solution", function () {
            const result = solve(`${__dirname}/input.txt`, MOVES_B, [0, 0, 10, 1]);
            console.log(result);
            expect(result).to.equal(25235);
        });
    });
})