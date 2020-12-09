const { numbersFromFile, combinations } = require("../core.js");

const sum = ns => ns.reduce((a, b) => a + b, 0);
const findSums = ns => new Set(combinations(ns).map(([a, b]) => a !== b ? a + b : 0));
const numbersForSum = (target, [n, ...ns], seen = []) => {
    const summed = sum(seen);
    return target === summed ? seen :
             target < summed ? [] :
             n === undefined ? []
                             : numbersForSum(target, ns, [...seen, n]);
};
const findWeakness = (target, ns) => {
    const cs = numbersForSum(target, ns); 
    return ns.length === 0 ? 0 :
             cs.length > 0 ? Math.min(...cs) + Math.max(...cs) 
                           : findWeakness(target, ns.slice(1));
};
// TODO (optimization): remove irrelevant sums, add only new ones
const findMissingSum = (ns, lookback, i = lookback) => {
    const sums = findSums(ns.slice(i - lookback, i));
    return i === ns.length ? null : 
          !sums.has(ns[i]) ? ns[i] 
                           : findMissingSum(ns, lookback, i + 1);
};

const solveA = (path, lookback) => findMissingSum(numbersFromFile(path), lookback)
const solveB = (path, target) => findWeakness(target, numbersFromFile(path));

module.exports =  {
    numbersForSum,
    findMissingSum,
    findWeakness,
    solveA,
    solveB,
};