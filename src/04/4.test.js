const { expect } = require("chai");
const { parsePassport, solveA, solveB } = require("./4");

describe("Day 4", function () {
    context("helpers", function () {
        specify("parse password", function () {
            const example = "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\nbyr:1937 iyr:2017 cid:147 hgt:183cm";
            const expected = {
                ecl: "gry",
                pid: "860033327",
                eyr: "2020",
                hcl: "#fffffd",
                byr: "1937",
                iyr: "2017",
                cid: "147",
                hgt: "183cm",
            };
            const result = parsePassport(example);

            expect(result).to.deep.equal(expected);
        });
    });

    context("A", function () {
        specify("example", function () {
            expect(solveA(`${__dirname}/example.txt`)).to.equal(2);
        });

        specify("solution", function () {
            const result = solveA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(235);
        });
    });

    context("B", function () {
        specify("example invalid", function () {
            expect(solveB(`${__dirname}/exampleB-invalid.txt`)).to.equal(0);
        });

        specify("example valid", function () {
            expect(solveB(`${__dirname}/exampleB-valid.txt`)).to.equal(4);
        });

        specify("solution", function () {
            const result = solveB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(194);
        });
    });
})