const { linesFromFile, powerset } = require("../core.js");

const toBinaryString = x => parseInt(x, 10).toString(2).padStart(36, "0").split("");
const xIndices = ns => ns.map((n, i) => n === "X" ? i : false).filter(x => x !== false)

const applyMaskA = (mask, ns) => parseInt(ns.map((n, i) => mask[i] !== "X" ? mask[i] : n).join(""), 2);
const applyMaskB = (mask, index) => powerset(xIndices(mask)).map(xs => {
    const nextIndex = index.map((n, i) => mask[i] === "0" ? n : mask[i]);
    xs.forEach(x => nextIndex[x] = 1);
    return parseInt(nextIndex.join("").replace(/X/g, 0), 2);
});

const decoderV1 = (mask, mem, index, value) => {
    mem[index] = applyMaskA(mask, toBinaryString(value));
    return { mask, mem };
};
const decoderV2 = (mask, mem, index, value) => {
    const indices = applyMaskB(mask, toBinaryString(index));
    indices.forEach(i => mem[i] = parseInt(value, 10));
    return { mask, mem };
};

const processLine = process => ({ mask, mem }, l) => {
    const [key, value] = l.split(" = ");
    return key === "mask" ? { mask: value.split(""), mem } 
        : process(mask, mem, parseInt(key.slice(4, -1), 10), value);
};

const solve = (path, decoder) => {
    const { mem } = linesFromFile(path).reduce(processLine(decoder), { mask: Array(36).fill("X"), mem: {} })
    return Object.values(mem).reduce((a, b) => a + b, 0);
};

module.exports =  {
    processLine,
    decoderV1,
    decoderV2,
    solve,
};