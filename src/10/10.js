// TODO: make less imperative
const { numbersFromFile } = require("../core.js");

const nextOptions = (a, js) => [a + 1, a + 2, a + 3].filter(o => js.has(o));

const solveA = path => {
    const joltages = new Set(numbersFromFile(path));
    const diffs = [0, 0, 1];
    
    let current = 0;
    let options = nextOptions(current, joltages);
    while (options.length > 0) {
        diffs[options[0] - current - 1]++;
        current = options[0];
        options = nextOptions(current, joltages);
    }

    return diffs[0] * diffs[2];
};

const countTree = (js, n = 0, seen = {}) => {
    const options = nextOptions(n, js);
    if (seen[n]) {
        return seen[n];
    }

    if (options.length === 0) {
        seen[n] = 1;
        return seen[n];
    }
    
    seen[n] = options.reduce((acc, x) => acc + countTree(js, x, seen), 0);
    
    return seen[n];
};
const solveB = path => countTree(new Set(numbersFromFile(path)));

module.exports =  {
    solveA,
    solveB,
};