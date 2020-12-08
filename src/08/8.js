const { linesFromFile } = require("../core.js");

const OPS = {
    nop: (state, arg) => ({...state, ip: state.ip + 1}),
    acc: (state, arg) => ({...state, acc: state.acc + arg, ip: state.ip + 1}),
    jmp: (state, arg) => ({...state, ip: state.ip + arg}),
};
const parseOp = s => { 
    const [op, arg] = s.split(" "); 
    return [OPS[op], parseInt(arg, 10)] 
};
const newState = () => ({ ip: 0, acc: null, h: new Set(), term: false });
const findJmps = ls => ls.map((l, i) => l.includes("jmp") ? i : null).filter(l => l);

// Imperative: as we will run into the limitations of recursion soon
const run = ops => {
    let state = newState();
    while (!state.h.has(state.ip)) {
        state.h.add(state.ip);

        let [op, arg] = ops[state.ip];
        state = op(state, arg);

        if (state.ip === ops.length) {
            state.term = true;
            break;
        }
    }

    return { acc: state.acc, term: state.term };
};

const solveA = path => run(linesFromFile(path).map(parseOp));
const solveB = path => {
    const lines = linesFromFile(path);
    const jmps = findJmps(lines);

    let endState = newState();
    while (!endState.term) {
        let ops = lines.map(parseOp);
        let jmp = jmps.pop();
        ops[jmp] = [OPS.nop, ops[jmp][1]]
        endState = run(ops);
    }

    return endState;
};

module.exports =  {
    solveA,
    solveB,
};