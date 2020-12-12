const { expect } = require("chai");
const { MOVES, MOVES_B, solveA, solveB } = require("./12");

describe("Day 12", function () {
    context("helpers", function () {
        specify("moves A", function () {
            const examples = [
                [[0, 0, "E"], MOVES.L(90), [0, 0, "N"]],
                [[0, 0, "E"], MOVES.L(180), [0, 0, "W"]],
                [[0, 0, "E"], MOVES.L(270), [0, 0, "S"]],
                [[0, 0, "E"], MOVES.L(360), [0, 0, "E"]],
                [[0, 0, "E"], MOVES.R(90), [0, 0, "S"]],
                [[0, 0, "E"], MOVES.R(180), [0, 0, "W"]],
                [[0, 0, "E"], MOVES.R(270), [0, 0, "N"]],
                [[0, 0, "E"], MOVES.R(360), [0, 0, "E"]],
                [[0, 0, "E"], MOVES.F(10), [10, 0, "E"]],
                [[0, 0, "E"], MOVES.N(10), [0, 10, "E"]],
                [[0, 0, "E"], MOVES.E(10), [10, 0, "E"]],
                [[0, 0, "E"], MOVES.S(10), [0, -10, "E"]],
                [[0, 0, "E"], MOVES.W(10), [-10, 0, "E"]],
            ];
            examples.forEach(([current, move, expected]) => {
                const result = move(current);
                expect(result).to.deep.equal(expected);
            });
        });

        specify("moves B", function () {
            const examples = [

            ];
            examples.forEach(([current, move, expected]) => {
                const result = move(current);
                expect(result).to.deep.equal(expected);
            });
        });
    });

    context("A", function () {
        specify("example", function () {
            const result = solveA(`${__dirname}/example.txt`);
            console.log(result);
            expect(result).to.equal(25);
        });

        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(1533);
        });
    });

    context("B", function () {
        specify("example", function () {
            const result = solveB(`${__dirname}/example.txt`);
            expect(result).to.equal(286);
        });

        specify("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(25235);
        });
    });
})