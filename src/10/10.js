// TODO: make less imperative
const { numbersFromFile } = require("../core.js");

const nextOptions = (a, js) => [a + 1, a + 2, a + 3].filter(o => js.has(o));

const solveA = path => {
    const joltages = new Set(numbersFromFile(path));
    let current = 0;
    let options = nextOptions(current, joltages);
    const diffs = [0, 0, 1];

    while (options.length > 0) {
        diffs[options[0] - current - 1]++;
        current = options[0];
        options = nextOptions(current, joltages);
    }

    return diffs[0] * diffs[2];
};

const countTree = (js, n = 0, seen = {}) => {
    if (seen[n] !== undefined) {
        return seen[n];
    }
    
    const options = nextOptions(n, js);
    if (options.length === 0) {
        seen[n] = 1;
        return seen[n];
    }

    seen[n] = options.reduce((acc, x) => acc + countTree(js, x, seen), 0);
    
    return seen[n];
};

const solveB = path => {
    const joltages = new Set(numbersFromFile(path));
    return countTree(joltages);
};

module.exports =  {
    solveA,
    solveB,
};