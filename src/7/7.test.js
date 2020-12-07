const { expect } = require("chai");
const { parseRule, solveA, solveB } = require("./7");

describe("Day 7", function () {
    context("helpers", function () {
        specify("parse rule", function () {
            const examples = [
                [
                    "light red bags contain 1 bright white bag, 2 muted yellow bags.",
                    { "light red": { "bright white": 1, "muted yellow": 2 } }
                ],
                [
                    "shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
                    { "shiny gold": { "dark olive": 1, "vibrant plum": 2 } }
                ],
                [
                    "faded blue bags contain no other bags.",
                    { "faded blue": {} }
                ]
            ];
            examples.forEach(([input, expected]) => {
                expect(parseRule(input)).to.deep.equal(expected);
            });
        });
    });

    context("A", function () {
        specify("example", function () {
            const result = solveA(`${__dirname}/example.txt`);
            console.log(result);
            expect(result).to.equal(4);
        });

        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(289);
        });
    });

    context("B", function () {
        specify("example", function () {
            const result = solveB(`${__dirname}/example.txt`);
            console.log(result);
            expect(result).to.equal(32);
        });

        specify("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(30055);
        });
    });
})