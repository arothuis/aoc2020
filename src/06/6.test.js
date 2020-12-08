const { expect } = require("chai");
const { countLetters, countSimilarities, solveA, solveB } = require("./6");

describe("Day 6", function () {
    context("helpers", function () {
        specify("count letters", function () {
            const examples = [
                [{}, "a", {a: 1}],
                [{a: 1}, "a", {a: 2}],
                [{a: 1}, "b", {a: 1, b: 1}],
            ];
            examples.forEach(([initial, letter, expected]) => {
                expect(countLetters(initial, letter)).to.deep.equal(expected);
            });
        });

        specify("count similarities", function () {
            const examples = [
                [[["a", "b"], ["a"]], 1],
                [[["a", "b"], ["a", "b"]], 2],
                [[["a", "b"], ["c", "d"]], 0],
            ];
            examples.forEach(([group, expected]) => {
                expect(countSimilarities(group)).to.equal(expected);
            });
        });
        
    });

    context("A", function () {
        specify("example", function () {
            const result = solveA(`${__dirname}/example.txt`);
            console.log(result);
            expect(result).to.equal(11);
        });

        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(6726);
        });
    });

    context("B", function () {
        specify("example", function () {
            const result = solveB(`${__dirname}/example.txt`);
            console.log(result);
            expect(result).to.equal(6);
        });

        specify("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(3316);
        });
    });
})