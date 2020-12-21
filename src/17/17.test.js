const { expect } = require("chai");
const { solveA, solveB, parseLayer, layerToString, expandCube, nextCube } = require("./17");

describe("Day 17", function () {
    context("helpers", function () {
        specify("expand cube", function () {
            const examples = [
                [
                    [
                        "...\n...\n...",
                    ],
                    [
                        ".....\n.....\n.....\n.....\n.....",
                        ".....\n.....\n.....\n.....\n.....",
                        ".....\n.....\n.....\n.....\n.....",
                    ]
                ],
                [
                    [
                        ".....\n.....\n.....\n.....\n.....",
                        ".....\n.....\n.....\n.....\n.....",
                        ".....\n.....\n.....\n.....\n.....",
                    ],
                    [
                        ".......\n.......\n.......\n.......\n.......\n.......\n.......",
                        ".......\n.......\n.......\n.......\n.......\n.......\n.......",
                        ".......\n.......\n.......\n.......\n.......\n.......\n.......",
                        ".......\n.......\n.......\n.......\n.......\n.......\n.......",
                        ".......\n.......\n.......\n.......\n.......\n.......\n.......",
                    ],
                ],
            ];
            examples.forEach(([input, expected]) => {
                const result = expandCube(input.map(parseLayer));
                expect(result).to.deep.equal(expected.map(parseLayer));
            });
        });

        specify("next cube", function () {
            const examples = [
                [
                    [
                        ".#.\n..#\n###",
                    ],
                    [
                        ".....\n.....\n.#...\n...#.\n..#..",
                        ".....\n.....\n.#.#.\n..##.\n..#..",
                        ".....\n.....\n.#...\n...#.\n..#..",
                    ],
                ]
            ]

            examples.forEach(([input, expected]) => {
                const result = nextCube(input.map(parseLayer));
                expect(result).to.deep.equal(expected.map(parseLayer));
            });
        });
    });

    context("A", function () {
        specify("example", function () {
            const result = solveA(`${__dirname}/example.txt`);
            console.log(result);
            expect(result).to.equal(112);
        });

        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(362);
        });
    });

    context.skip("B", function () {
        specify("example", function () {
            const result = solveB(`${__dirname}/example.txt`);
            console.log(result);
            expect(result).to.equal(848);
        });

        specify.skip("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(0);
        });
    });
})