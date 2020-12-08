const { linesFromFile } = require("../core");

const countLetters = (acc, l) => ({...acc, [l]: acc[l] ? acc[l] + 1 : 1});
const parseGroup = g => g.split("\n").map(l => l.split(""));
const countSimilarities = g => {
    const counts = g.flat().reduce(countLetters, {});
    return Object.keys(counts).filter(k => counts[k] === g.length).length;
};

const solveA = path => linesFromFile(path, "\n\n")
    .reduce((acc, g) => acc + new Set(parseGroup(g).flat()).size, 0);
const solveB = path => linesFromFile(path, "\n\n")
    .reduce((acc, g) => acc + countSimilarities(parseGroup(g)), 0);

module.exports =  {
    countLetters,
    countSimilarities,
    solveA,
    solveB,
};