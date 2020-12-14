const { expect } = require("chai");
const { processLineA, solveA } = require("./14");

describe("Day 14", function () {
    context("helpers", function () {
        specify("process line A", function () {
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
                expect(processLineA(initial, line)).to.deep.equal(expected);
            });
        });


        specify.skip("process line B", function () {
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
                            26: 42,
                            27: 42,
                            58: 42,
                            59: 42,
                        } 
                    }
                ],
            ];
            examples.forEach(([initial, line, expected]) => {
                expect(processLineB(initial, line)).to.deep.equal(expected);
            });
        });
    });

    context("A", function () {
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
        specify("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(0);
        });
    });
})