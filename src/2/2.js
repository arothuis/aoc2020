const { linesFromFile } = require("../core");

const countInWord = (letter, word) => 
    word.split("").filter(l => l === letter).length;

const parsePassLine = line => (
    [_, a, b, letter, word] = line.match(/^(\d+)-(\d+) (\w): (\w+)$/),
        { a: parseInt(a, 10), b: parseInt(b, 10), letter, word }
);

const applyPolicyA = (min, max, letter) => word => (
    count = countInWord(letter, word), 
    count >= min && count <= max
);

const applyPolicyB = (a, b, letter) => word => 
    (word[a - 1] === letter) !== (word[b - 1] === letter);

const solveA = path => 
    linesFromFile(path)
        .map(l => parsePassLine(l))
        .filter(({a, b, letter, word}) => applyPolicyA(a, b, letter)(word))
        .length;

const solveB = path => 
        linesFromFile(path)
            .map(l => parsePassLine(l))
            .filter(({a, b, letter, word}) => applyPolicyB(a, b, letter)(word))
            .length;

module.exports =  {
    countInWord,
    parsePassLine,
    applyPolicyA,
    solveA,
    applyPolicyB,
    solveB,
}