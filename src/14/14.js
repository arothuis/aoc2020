const { linesFromFile } = require("../core.js");

const toBinaryString = x => parseInt(x, 10).toString(2).padStart(36, "0").split("");

const applyMaskA = (mask, ns) => parseInt(ns.map((n, i) => mask[i] !== "X" ? mask[i] : n).join(""), 2);
const processLineA = ({ mask, mem }, l) => {
    const [key, value] = l.split(" = ");
    if (key === "mask") {
        return { mask: value.split(""), mem };
    }

    const index = parseInt(key.slice(4, -1), 10);
    mem[index] = applyMaskA(mask, toBinaryString(value));

    return { mask, mem };
};

// const findXs = ns => ns.map((n, i) => n === "X" ? i : false).filter(x => x !== false);
// const applyMaskB = (mask, index) => {
//     const xs = findXs(mask);

//     // generate indices based on all possible combinations of xs for both 1s and 0s (powerset -> replace index -> save)

//     return [];
// };

// const processLineB = ({ mask, mem }, l) => {
//     const [key, value] = l.split(" = ");
//     if (key === "mask") {
//         return { mask: value.split(""), mem };
//     }

//     const index = parseInt(key.slice(4, -1), 10);
//     const indices = applyMaskB(mask, toBinaryString(index));

//     indices.forEach(i => mem[i] = parseInt(value, 10));

//     return { mask, mem };
// };

const solveA = path => {
    const { mem } = linesFromFile(path).reduce(processLineA, { mask: Array(36).fill("X"), mem: {} })
    return Object.values(mem).reduce((a, b) => a + b, 0);
};

// const solveB = path => {
//     const { mem } = linesFromFile(path).reduce(processLineB, { mask: Array(36).fill("X"), mem: {} })
//     return Object.values(mem).reduce((a, b) => a + b, 0);
// };

module.exports =  {
    processLineA,
    solveA,
};