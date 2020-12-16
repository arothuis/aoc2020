const { expect } = require("chai");
const { readFileSync } = require("fs");
const { parseInstructions, solveA, solveB } = require("./16");

describe("Day 16", function () {
    context("helpers", function () {
        specify("parse fields from instructions", function () {
            const instructions = readFileSync(`${__dirname}/example.txt`, "utf-8");
            const result = parseInstructions(instructions);

            expect(result.requirements[0].field).to.equal("class");
            expect(result.requirements[1].field).to.equal("row");
            expect(result.requirements[2].field).to.equal("seat");
        });

        specify("parse predicates from instructions", function () {
            const instructions = readFileSync(`${__dirname}/example.txt`, "utf-8");
            const result = parseInstructions(instructions);

            // Predicates (1-3 or 5-7)
            const examples = [
                [0, false],
                [1, true],
                [2, true],
                [3, true],
                [4, false],
                [5, true],
                [6, true],
                [7, true],
                [8, false],
            ];

            examples.forEach(([input, expected]) => {
                expect(result.requirements[0].isMetBy(input)).to.equal(expected);
            });
        });

        specify("parse tickets from instructions", function () {
            const instructions = readFileSync(`${__dirname}/example.txt`, "utf-8");
            const result = parseInstructions(instructions);

            expect(result.ticket).to.deep.equal([7, 1, 14]);
            expect(result.nearby).to.deep.equal([ [7, 3, 47], [40, 4, 50], [55, 2, 20], [38, 6, 12] ]);
        });
    });

    context("A", function () {
        specify("example", function () {
            const result = solveA(`${__dirname}/example.txt`);
            expect(result).to.equal(71);
        });
        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(30869);
        });
    });

    context.skip("B", function () {
        specify("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(48710);
        });
    });
})