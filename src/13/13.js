const { linesFromFile } = require("../core.js");

const loadBuses = path => {
    const [time, data] = linesFromFile(path);
    return data.split(",")
        .map((b, i) => ({ i, offset: b - time % +b, value: +b }))
        .filter(({value}) => !isNaN(value));
};

const solveA = path => {
    const first = loadBuses(path).sort((a, b) => a.offset - b.offset)[0];
    return first.offset * first.value;
};

const solveB = path => {
    const [initial, ...buses] = loadBuses(path);
        
    let stepSize = initial.value;
    let time = 0;

    for (let {i, value} of buses) {
        while ((time + i) % value !== 0) {
            time += stepSize;
        }
        stepSize *= value;
    }
     
    return time;
};

module.exports =  {
    solveA,
    solveB,
};