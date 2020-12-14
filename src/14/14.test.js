const { expect } = require("chai");
const { processLine, decoderV1, decoderV2, solve } = require("./14");

describe("Day 14", function () {
    context("helpers", function () {
        specify("process line with decoder V1", function () {
            const examples = [
                [
                    { mask: [], mem: {} }, 
                    "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", 
                    { 
                        mask: ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "1", "X", "X", "X", "X", "0", "X"], 
                        mem: {} 
                    }
                ],
                [
                    { 
                        mask: ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "1", "X", "X", "X", "X", "0", "X"], 
                    	mem: {} 
                    }, 
                    "mem[8] = 11", 
                    { 
                        mask: ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "1", "X", "X", "X", "X", "0", "X"], 
                        mem: { 8: 73 }
                    },
                ],
                [
                    { 
                        mask: ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "1", "X", "X", "X", "X", "0", "X"], 
                    	mem: { 8: 73 }
                    }, 
                    "mem[7] = 101", 
                    { 
                        mask: ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "1", "X", "X", "X", "X", "0", "X"], 
                        mem: { 8: 73, 7: 101 }
                    },
                ],
                [
                    { 
                        mask: ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "1", "X", "X", "X", "X", "0", "X"], 
                    	mem: { 8: 73, 7: 101 }
                    }, 
                    "mem[8] = 0", 
                    { 
                        mask: ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "1", "X", "X", "X", "X", "0", "X"], 
                        mem: { 8: 64, 7: 101 }
                    },
                ],
            ];
            examples.forEach(([initial, line, expected]) => {
                expect(processLine(decoderV1)(initial, line)).to.deep.equal(expected);
            });
        });


        specify("process line with decoder V2", function () {
            const examples = [
                [
                    { 
                        mask: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "1", "0", "0", "1", "X"], 
                        mem: {} 
                    }, 
                    "mem[42] = 100", 
                    { 
                        mask: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "1", "0", "0", "1", "X"],
                        mem: {
                            26: 100,
                            27: 100,
                            58: 100,
                            59: 100,
                        } 
                    }
                ],
            ];
            examples.forEach(([initial, line, expected]) => {
                expect(processLine(decoderV2)(initial, line)).to.deep.equal(expected);
            });
        });
    });

    context.skip("A", function () {
        specify("example", function () {
            const result = solveA(`${__dirname}/example.txt`);
            console.log(result);
            expect(result).to.equal(165);
        });

        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(6386593869035);
        });
    });

    context.skip("B", function () {
        specify("example", function () {
            const result = solveB(`${__dirname}/exampleB.txt`);
            console.log(result);
            expect(result).to.equal(208);
        });

        specify("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(4288986482164);
        });
    });
})