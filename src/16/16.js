const { readFileSync } = require("fs");

const makePredicate = (a1, a2, b1, b2) => v => (v >= a1 && v <= a2) || (v >= b1 && v <= b2);
const parseRequirements = ps => ps.split("\n")
        .map(p => p.match(/(.*): (\d*)-(\d*) or (\d*)-(\d*)/))
        .map(([_, field, a1, a2, b1, b2]) => ({ field, isMetBy: makePredicate(a1, a2, b1, b2) }));
const parseTickets = ts => ts.split("\n").slice(1).map(t => t.split(",").map(n => +n));
const parseInstructions = instructions => {
    const [reqs, ticket, nearby] = instructions.split("\n\n");
    return { requirements: parseRequirements(reqs), ticket: parseTickets(ticket)[0], nearby: parseTickets(nearby) };
};

const validateTicket = (reqs, ticket) => ticket.map((value, index) => {
        const requirements = reqs.map(r => [r.field, r.isMetBy(value)]);
        const isPossible = requirements.filter((r) => Boolean(r[1])).length > 0;
        return { index, value, requirements: Object.fromEntries(requirements), isPossible };
});
const filterTickets = (reqs, ts, fn) => ts.map(t => validateTicket(reqs, t).filter(fn));

const solveA = path => {
    const { requirements, nearby } = parseInstructions(readFileSync(path, "utf-8"));
    return filterTickets(requirements, nearby, v => !v.isPossible).flat().reduce((acc, {value}) => acc + value, 0);
};

// TODO: clean this up (extract functions, introduce more intentful naming)
const solveB = path => {
    const { requirements, nearby, ticket } = parseInstructions(readFileSync(path, "utf-8"));
    const valid = filterTickets(requirements, nearby, v => v.isPossible);
    const numbers = [...Array(requirements.length).keys()];

    const solved = {};
    const toSolve = new Set(requirements.map(m => m.field));
    const fields = Object.fromEntries(
        requirements.map(r => [r.field, new Set([...numbers])])
    );
    valid.flatMap(t => t.map(v => [v.index, Object.keys(v.requirements).filter(r => !v.requirements[r])]))
        .filter(e => e[1].length > 0)
        .forEach(([candidate, n]) => fields[n[0]].delete(candidate));
    
    while (toSolve.size > 0) {
        for (let [name, options] of Object.entries(fields)) {
            if (options.size === 1) {
                const currentField = options.values().next().value;
                solved[name] = currentField;

                for (let optionSet of Object.values(fields)) {
                    optionSet.delete(currentField);
                    toSolve.delete(name);
                }
            }
        }
    }

    return Object.keys(solved)
        .filter(s => s.startsWith("departure"))
        .map(f => ticket[solved[f]])
        .reduce((a, b) => a * b, 1);
};

module.exports =  {
    parseInstructions,
    solveA,
    solveB,
};