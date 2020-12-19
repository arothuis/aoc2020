const { linesFromFile } = require("../core.js");

const tokenize = input => input.split("")
    .filter(t => t !== " ")
    .map(x => x.match(/\d+/) ? +x : x);

// Parsing functions source: http://jorendorff.github.io/calc/docs/calculator-parser.html
// TODO: Refactor to something less imperative and stateful
const parseA = tokens => {
    let i = 0;

    function parsePrimaryExpr() {
        const value = tokens[i];
        i++;

        if (typeof value === "number") {
            return { type: "number", value };
        } 

        const expr = parseExpr();
        i++;
        return expr;
    }

    function parseExpr() {
        let expr = parsePrimaryExpr();
        let value = tokens[i];
        while (value === "+" || value === "*") {
            i++;
            const rhs = parsePrimaryExpr();
            expr = { type: value, left: expr, right: rhs };
            value = tokens[i];
        }
        return expr;
    }

    return parseExpr();
}
const parseB = tokens => {
    let i = 0;

    function parsePrimaryExpr() {
        const value = tokens[i];
        i++;

        if (typeof value === "number") {
            return { type: "number", value };
        } 
        
        const expr = parseExpr();
        i++;
        return expr;
    }

    function parseAddExpr() {
        let expr = parsePrimaryExpr();
        let value = tokens[i];
        while (value === "+") {
            i++;
            const rhs = parsePrimaryExpr();
            expr = { type: value, left: expr, right: rhs };
            value = tokens[i];
        }
        return expr;
    }

    function parseExpr() {
        let expr = parseAddExpr();
        let value = tokens[i];
        while (value === "*") {
            i++;
            const rhs = parseAddExpr();
            expr = { type: value, left: expr, right: rhs };
            value = tokens[i];
        }
        return expr;
    }

    return parseExpr();
}

const evaluate = tree =>
    tree.type === "+" ? evaluate(tree.left) + evaluate(tree.right) :
    tree.type === "*" ? evaluate(tree.left) * evaluate(tree.right) :
    tree.value;

const solveA = path => linesFromFile(path)
    .reduce((acc, l) => acc + evaluate(parseA(tokenize(l))) , 0);
const solveB = path => linesFromFile(path)
    .reduce((acc, l) => acc + evaluate(parseB(tokenize(l))) , 0);

module.exports =  {
    tokenize,
    parseA,
    parseB,
    evaluate,
    solveA,
    solveB,
};