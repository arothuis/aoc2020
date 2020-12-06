const { readFileSync } = require("fs");

const countLetters = (acc, l) => ({...acc, [l]: acc[l] ? acc[l] + 1 : 1});

const parseGroup = g => g.split("\n").map(l => l.split(""));
const countUniqueLetters = g => (
    counts = g.flat().reduce(countLetters, {}),
    Object.keys(counts).filter(k => counts[k] === g.length).length
);

const solveA = path => 
    readFileSync(path, "utf-8").split("\n\n")
        .reduce((acc, g) => acc + new Set(parseGroup(g).flat()).size, 0);

const solveB = path => 
    readFileSync(path, "utf-8").split("\n\n")
        .reduce((acc, g) => acc + countUniqueLetters(parseGroup(g)), 0);

module.exports =  {
    countLetters,
    solveA,
    solveB,
};