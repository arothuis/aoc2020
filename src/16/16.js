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

const validateTicket = (reqs, ticket) => ticket.map(value => {
        const requirements = reqs.map(r => [r.field, r.isMetBy(value)]);
        const isPossible = requirements.filter((r) => Boolean(r[1])).length > 0;
        return { value, requirements: Object.fromEntries(requirements), isPossible };
});

const solveA = path => {
    const { requirements, nearby } = parseInstructions(readFileSync(path, "utf-8"));
    return nearby
        .flatMap(t => validateTicket(requirements, t).filter(v => !v.isPossible))
        .reduce((acc, {value}) => acc + value, 0);
};

module.exports =  {
    parseInstructions,
    solveA,
};