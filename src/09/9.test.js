const { expect } = require("chai");
const { numbersForSum, findMissingSum, findWeakness, solveA, solveB } = require("./9");

describe("Day 9", function () {
    context("helpers", function () {
        specify("numbers for sum", function () {
            const examples = [
                [10, [2, 8, 1], [2, 8]],
                [10, [1, 2, 8], []],
                [10, [], []],
            ];
            examples.forEach(([target, numbers, expected]) => {
                const result = numbersForSum(target, numbers);
                expect(result).to.deep.equal(expected);
            });
        });

        specify("find missing sum", function () {
            const examples = [
                [[1, 2, 3, 5, 6, 7], 2, 6],
                [[1, 2, 3, 4, 5, 10], 3, 10],
                [[1, 2, 3, 5, 8], 2, null]
            ];
            examples.forEach(([numbers, lookback, expected]) => {
                const result = findMissingSum(numbers, lookback);
                expect(result).to.equal(expected);
            });
        });

        specify("find weakness", function () {
            const examples = [
                [10, [1, 2, 7], 8],
                [10, [1, 2, 3], 0],
            ];
            examples.forEach(([target, numbers, expected]) => {
                const result = findWeakness(target, numbers);
                expect(result).to.deep.equal(expected);
            });
        });
    });

    context("A", function () {
        specify("example", function () {
            const result = solveA(`${__dirname}/example.txt`, 5);
            console.log(result);
            expect(result).to.equal(127);
        });

        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`, 25);
            console.log(result);
            expect(result).to.equal(552655238);
        });
    });

    context("B", function () {
        specify("example", function () {
            const result = solveB(`${__dirname}/example.txt`, 127);
            expect(result).to.equal(62);
        });

        specify("solution", function () {
            const result = solveB(`${__dirname}/input.txt`, 552655238);
            console.log(result);
            expect(result).to.equal(70672245);
        });
    });
})