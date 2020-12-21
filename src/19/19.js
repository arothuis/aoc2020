const { readFileSync } = require("fs");

const equals = n => (x, i) => x[i] === n ? [true, i + 1] : [false, i];
const or = ps => (x, i, rules) => {
    const [accepted, ai] = ps.reduce(([accepted, ai], p) => accepted ? [accepted, ai] : p(x, ai, rules), [false, i]);
    return accepted ? [true, ai] : [false, i];
};
const rule = ref => (x, i, rules) => rules[ref](x, i, rules);
const sequence = ps => (x, i, rules) => {
    const [accepted, ai] = ps.reduce(([accepted, ai], p) => !accepted ? [accepted, ai] : p(x, ai, rules), [true, i]);
    return accepted ? [true, ai] : [false, i];
};

const parseSeq = refs => sequence(refs.split(" ").map(rule));
const parseRule = (rules, line) => {
    const [key, value] = line.split(": ");
    const letterMatch = value.match(/\"(\w)\"/);
    return letterMatch ? { ...rules, [key]: equals(letterMatch[1]) }
        : { ...rules, [key]: or(value.split(" | ").map(parseSeq)) };
};

const isAccepted = rules => word => {
    const [matched, matchLength] = rule("0")(word, 0, rules);
    return [matched && word.length === matchLength, word, matched, matchLength];
};

const solveA = path => {
    const [ruleLines, words] = readFileSync(path, "utf-8").split("\n\n");
    const rules = ruleLines.split("\n").reduce(parseRule, {});
    return words.split("\n").map(isAccepted(rules)).reduce((s, [a]) => a ? s + 1 : s, 0);
};
const solveB = path => {
    // TODO: fix for (possibly infinite) recurring rules...
    let [ruleLines, words] = readFileSync(path, "utf-8").split("\n\n");
    ruleLines += "\n8: 42 | 42 8\n11: 42 31 | 42 11 31";
    const rules = ruleLines.split("\n").reduce(parseRule, {});
    return words.split("\n").map(isAccepted(rules)).reduce((s, [a]) => a ? s + 1 : s, 0);
};

module.exports =  {
    equals,
    or,
    rule,
    sequence,
    parseRule,
    isAccepted,
    solveA,
    solveB,
};