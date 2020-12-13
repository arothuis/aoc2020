const { linesFromFile } = require("../core.js");

const solveA = path => {
    const [time, buses] = linesFromFile(path);
    const [wait, bus] = buses.split(",")
        .filter(b => b !== "x")
        .map(b => [b - time % +b, +b])
        .sort((a, b) => a[0] - b[0])[0];
    return wait * bus;
};

// TODO: Refactor to more functional approach (recursion / fold)
// TODO: Dive into Chinese Remainder Theory
const solveB = path => {
    const buses = linesFromFile(path)[1].split(",")
        .map((n, i) => [i, +n])
        .filter(b => !isNaN(b[1]));
        
    let stepSize = buses[0][1];
    let time = 0;

    for (let [i, n] of buses.slice(1)) {
        while ((time + i) % n !== 0) {
            time += stepSize;
        }
        stepSize *= n;
    }
     
    return time;
};

module.exports =  {
    solveA,
    solveB,
};