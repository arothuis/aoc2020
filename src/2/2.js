const { readFileSync } = require("fs");
const isTrue = x => x === true;

const countInWord = (letter, word) => 
    word.split("").filter(l => l === letter).length;

const parsePolicy = policy => (
    [a, b] = policy.split("-"),
        [parseInt(a, 10), parseInt(b, 10)]
);
const parsePassLine = line => (
    [policy, letter, word] = line.split(" "),
    [a, b] = parsePolicy(policy),
        { a, b, letter: letter[0], word }
)

const applyPolicyA = (min, max, letter) => word => (
    count = countInWord(letter, word), 
    count >= min && count <= max
);

const applyPolicyB = (a, b, letter) => word => 
    (word[a - 1] === letter) !== (word[b - 1] === letter);

const solveA = path => 
    readFileSync(path, "utf-8")
        .split("\n")
        .map(l => parsePassLine(l))
        .map(({a, b, letter, word}) => applyPolicyA(a, b, letter)(word))
        .filter(isTrue)
        .length;

const solveB = path => 
        readFileSync(path, "utf-8")
            .split("\n")
            .map(l => parsePassLine(l))
            .map(({a, b, letter, word}) => applyPolicyB(a, b, letter)(word))
            .filter(isTrue)
            .length;

module.exports =  {
    countInWord,
    parsePassLine,
    applyPolicyA,
    solveA,
    applyPolicyB,
    solveB,
}