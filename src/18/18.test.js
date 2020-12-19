const { expect } = require("chai");
const { solveA, solveB, tokenize, parseA, parseB, evaluate } = require("./18");

describe("Day 18", function () {
    context("helpers", function () {
        specify("tokenize", function () {
            const examples = [
                ["(2 + (3 * 4))", ["(", 2, "+", "(", 3, "*", 4, ")", ")"]],
            ]
            examples.forEach(([input, expected]) => {
                const result = tokenize(input);
                expect(result).to.deep.equal(expected);
            });
        });

        specify("evaluate (parsing A)", function () {
            const examples = [
                ["2 + (3 * 4)", 14],
                ["(2 + 3) * 4", 20],
                ["2 + 3 * 4", 20],
            ]
            examples.forEach(([input, expected]) => {
                const result = evaluate(parseA(tokenize(input)));
                expect(result).to.equal(expected);
            });
        });

        specify("evaluate (parsing B)", function () {
            const examples = [
                ["2 + (3 * 4)", 14],
                ["(2 + 3) * 4", 20],
                ["2 + 3 * 4", 20],
            ]
            examples.forEach(([input, expected]) => {
                const result = evaluate(parseB(tokenize(input)));
                expect(result).to.equal(expected);
            });
        });
    });

    context("A", function () {
        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(5783053349377);
        });
    });

    context("B", function () {
        specify("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(74821486966872);
        });
    });
})