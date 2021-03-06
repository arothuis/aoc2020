const { linesFromFile } = require("../core");

const loadPassports = path => linesFromFile(path, "\n\n").map(parsePassport);

const parseField = f => {
    const [k, v] = f.split(":");
    return {[k]: v}
};
const parseLine = l => l.split(" ").map(parseField).reduce((fs, f) => ({...fs, ...f}), {});
const parsePassport = p => p.split("\n").map(parseLine).reduce((fs, f) => ({...fs, ...f}), {});

const and = (p1, p2) => x => p1(x) && p2(x);
const hasAll = (...ps) => ps.reduce((a, b) => a && b !== undefined, true);
const inRange = (min, max) => n => {
    const num = parseInt(n, 10);
    return num >= min && num <= max;
};
const validLength = n => {
    const num = n.slice(0, -2); 
    const q = n.slice(-2);
    return q === "cm" ? inRange(150, 193)(num) :
           q === "in" ? inRange(59, 76)(num) 
                      : false
};
const validHairColor = n => /^\#[0-9a-ff]{6}$/.test(n);
const validEyeColor = n => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(n);
const validPassId = n => /^\d{9}$/.test(n);

const allRequiredFields = ({ byr, iyr, eyr, hgt, hcl, ecl, pid}) => 
    hasAll(byr, iyr, eyr, hgt, hcl, ecl, pid);
const isValid = ({ byr, iyr, eyr, hgt, hcl, ecl, pid }) => 
    inRange(1920, 2002)(byr) && inRange(2010, 2020)(iyr) && inRange(2020, 2030)(eyr)
    && validLength(hgt) && validHairColor(hcl) && validEyeColor(ecl) && validPassId(pid);

const solveA = path => loadPassports(path).filter(allRequiredFields).length;
const solveB = path => loadPassports(path).filter(and(allRequiredFields, isValid)).length;

module.exports =  {
    parsePassport,
    solveA,
    solveB,
};