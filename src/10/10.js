const { numbersFromFile } = require("../core.js");

const nextOptions = (a, js) => [a + 1, a + 2, a + 3].filter(o => js.has(o));
const countTree = (js, n = 0, memo = {}) => {
    const options = nextOptions(n, js);
    if (memo[n]) {
        return memo[n];
    }

    if (options.length === 0) {
        memo[n] = 1;
        return memo[n];
    }
    
    memo[n] = options.reduce((acc, x) => acc + countTree(js, x, memo), 0);
    
    return memo[n];
};

const solveA = path => {
    const [j1, _, j3] = numbersFromFile(path)
        .sort((a, b) => a - b)
        .map((a, i, as) => a - (as[i - 1] || 0))
        .reduce((count, a) => [...count.slice(0, a - 1), count[a - 1] + 1, ...count.slice(a)], [0, 0, 1]);
    return j1 * j3;
};
const solveB = path => countTree(new Set(numbersFromFile(path)));

module.exports =  {
    solveA,
    solveB,
};