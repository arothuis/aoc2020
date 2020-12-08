// TODO: simplify and refactor for readability

const { linesFromFile } = require("../core.js");

const rulesFromFile = path => linesFromFile(path).map(parseRule).reduce(toObject, {});
const toObject = (a, b) => Object.assign(b, a);

const REGEX_CONTAINER = /([\w\s]+) bags/;
const REGEX_CONTENTS = /(\d+) ([\w\s]+) bags?/g

const parseRuleContents = cs => cs === null ? {} 
    : cs.map(c => {
        const [number, a, b] = c.split(" "); 
        return { [`${a} ${b}`]: +number };
    }).reduce(toObject, {});
const parseRule = r => {
    const [containerTokens, contentTokens] = r.split(" contain ");
    const [_, container] = containerTokens.match(REGEX_CONTAINER);
    return  { [container]: parseRuleContents(contentTokens.match(REGEX_CONTENTS)) }
};

const tree = (name, rules, n = 1) => {
    const children = Object.keys(rules[name]).map(k => tree(k, rules, rules[name][k]));
    return { name, n, children }
};

const canContainBag = (rules, bag, target) => 
    rules[bag][target] !== undefined ? true
        : Object.keys(rules[bag])
            .reduce((a, b) => a || canContainBag(rules, b, target), false);
const countBags = ({n, children}) => 
    children.length === 0 ? n 
        : n + n * children.reduce((a, b) => a + countBags(b), 0)

const solveA = path => {
    const rules = rulesFromFile(path);
    return Object.keys(rules)
        .map(b => canContainBag(rules, b, "shiny gold"))
        .filter(b => b > 0).length
};
const solveB = path => countBags(tree("shiny gold", rulesFromFile(path))) - 1;

module.exports =  {
    parseRule,
    canContainBag,
    solveA,
    solveB,
};