const { linesFromFile } = require("../core");

const countInWord = (letter, word) => 
    word.split("").filter(l => l === letter).length;
const parsePassLine = line => {
    const [_, a, b, letter, word] = line.match(/^(\d+)-(\d+) (\w): (\w+)$/);
    return { a: parseInt(a, 10), b: parseInt(b, 10), letter, word }
};

const policyA = ({a, b, letter, word}) => {
    const count = countInWord(letter, word);
    return count >= a && count <= b;
};
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