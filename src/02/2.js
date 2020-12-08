const { linesFromFile } = require("../core");

const countInWord = (letter, word) => 
    word.split("").filter(l => l === letter).length;
const parsePassLine = line => (
    [_, a, b, letter, word] = line.match(/^(\d+)-(\d+) (\w): (\w+)$/),
        { a: parseInt(a, 10), b: parseInt(b, 10), letter, word }
);

const policyA = ({a, b, letter, word}) => (
    count = countInWord(letter, word), 
    count >= a && count <= b
);
const policyB = ({a, b, letter, word}) => 
    (word[a - 1] === letter) !== (word[b - 1] === letter);

const solveA = path => linesFromFile(path).map(parsePassLine).filter(policyA).length;
const solveB = path => linesFromFile(path).map(parsePassLine).filter(policyB).length;

module.exports =  {
    countInWord,
    parsePassLine,
    policyA,
    solveA,
    policyB,
    solveB,
}