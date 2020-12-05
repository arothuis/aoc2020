const { expect } = require("chai");
const { countInWord, applyPolicyA, parsePassLine, solveA, applyPolicyB, solveB } = require("./2");

describe("Day 2", function () {
    context("helpers", function () {
        specify("count in word", function () {
            const examples = [
                ["l", "aaa", 0],
                ["l", "lll", 3],
            ];
            examples.forEach(([letter, word, expected]) => {
                expect(countInWord(letter, word)).to.equal(expected);
            });
        });

        

        specify("parse pass line", function () {
            const examples = [
                ["1-2 l aaaa", { a: 1, b: 2, letter: "l", word: "aaaa" }],
                ["2-10 b abba", {a: 2, b: 10, letter: "b", word: "abba" }],
            ];

            examples.forEach(([input, expected]) => {
                expect(parsePassLine(input)).to.deep.equal(expected);
            });
        });

        specify("apply policy A", function () {
            const examples = [
                ["l", 1, 2, "aaa", false],
                ["l", 1, 2, "laa", true],
                ["l", 1, 2, "lla", true],
                ["l", 1, 2, "lll", false],
            ];
            examples.forEach(([letter, min, max, word, expected]) => {
                expect(applyPolicyA(min, max, letter)(word)).to.equal(expected);
            });
        });

        specify("apply policy B", function () {
            const examples = [
                ["l", 1, 2, "aaa", false],
                ["l", 1, 2, "laa", true],
                ["l", 1, 2, "lla", false],
                ["l", 1, 2, "lll", false],
            ];
            examples.forEach(([letter, min, max, word, expected]) => {
                expect(applyPolicyB(min, max, letter)(word)).to.equal(expected);
            });
        });
    });

    context("A", function () {
        specify("example", function () {
            expect(solveA(`${__dirname}/example.txt`)).to.equal(2);
        });

        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(603);
        });
    });

    context("B", function () {
        specify("example", function () {
            expect(solveB(`${__dirname}/example.txt`)).to.equal(1);
        });

        specify("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(404);
        });
    });
})