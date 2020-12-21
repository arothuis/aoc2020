const { expect } = require("chai");
const { equals, or, rule, sequence, solveA, solveB } = require("./19");

describe("Day 19", function () {
    context("helpers", function () {
        specify("equals", function () {
            const examples = [
                ["a", "aaa", 0, [true, 1]],
                ["a", "bbb", 1, [false, 1]],
                ["b", "bbb", 0, [true, 1]],
                ["b", "aaa", 1, [false, 1]],
            ];

            examples.forEach(([n, x, i, expected]) => {
                const predicateFn = equals(n);
                expect(predicateFn(x, i)).to.deep.equal(expected);
            });
        });

        specify("or", function () {
            const examples = [
                [[equals("a"), equals("b")], "aaa", 0, [true, 1]],
                [[equals("a"), equals("b")], "aba", 1, [true, 2]],
                [[equals("b")], "b", 0, [true, 1]],
                [[equals("a"), equals("b")], "c", 0, [false, 0]],
            ];

            examples.forEach(([ps, x, i, expected]) => {
                const predicateFn = or(ps);
                expect(predicateFn(x, i)).to.deep.equal(expected, x);
            });
        });

        specify("matches a rule", function () {
            const rules = {
                "0": rule("1"),
                "1": equals("a"),
                "2": equals("b"),
                "3": rule("2"),
                "4": or([rule("1"), rule("2")]),
            };

            const examples = [
                ["a", "0", [true, 1]],
                ["a", "3", [false, 0]],
                ["b", "3", [true, 1]],
                ["a", "4", [true, 1]],
                ["b", "4", [true, 1]],
            ];

            examples.forEach(([input, ref, expected]) => {
                const result = rule(ref)(input, 0, rules);
                expect(result).to.deep.equal(expected);
            });
        });

        specify("matches a sequence", function () {
            const rules = {
                "0": sequence([rule("1"), rule("2")]),
                "1": equals("a"),
                "2": equals("b"),
                "3": or([
                    sequence([rule("1"), rule("2")]), 
                    sequence([rule("2"), rule("1")])
                ]),
                "4": sequence([rule("1"), or([rule("1"), rule("2")]), rule("2")]),
            };

            const examples = [
                ["ab", "0", [true, 2]],
                ["abc", "0", [true, 2]],
                ["ba", "0", [false, 0]],
                ["aa", "0", [false, 0]],
                ["ab", "3", [true, 2]],
                ["ba", "3", [true, 2]],
                ["aa", "3", [false, 0]],
                ["abb", "4", [true, 3]],
                ["aaa", "4", [false, 0]],
            ];

            examples.forEach(([input, ref, expected]) => {
                const result = rule(ref)(input, 0, rules);
                expect(result).to.deep.equal(expected, input);
            });
        });
    });

    context("A", function () {
        specify("example", function () {
            const result = solveA(`${__dirname}/exampleA.txt`);
            console.log(result);
            expect(result).to.equal(2);
        });

        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(180);
        });
    });

    context.skip("B", function () {
        specify("example", function () {
            const result = solveB(`${__dirname}/exampleB.txt`);
            console.log(result);
            expect(result).to.equal(12);
        });

        specify.skip("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(0);
        });
    });
})