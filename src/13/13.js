const { linesFromFile } = require("../core.js");

const loadBuses = path => {
    const [time, data] = linesFromFile(path);
    return data.split(",")
        .map((b, i) => ({ i, offset: b - time % +b, id: +b }))
        .filter(({id}) => !isNaN(id));
};
const findBusSequenceTime = ([bus, ...buses], stepSize, time = 0) => 
    bus === undefined ? time : 
    (time + bus.i) % bus.id === 0 ? findBusSequenceTime(buses, stepSize * bus.id, time)
        : findBusSequenceTime([bus, ...buses], stepSize, time + stepSize);

const solveA = path => {
    const first = loadBuses(path).sort((a, b) => a.offset - b.offset)[0];
    return first.offset * first.id;
};
const solveB = path => {
    const [initial, ...buses] = loadBuses(path);
    return findBusSequenceTime(buses, initial.id);
};

module.exports =  {
    solveA,
    solveB,
};