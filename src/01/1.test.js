const { expect } = require("chai");

const { expenseReportA, expenseReportB } = require("./1");

describe("Day 1", function () {
    context("A", function () {
        specify("expense report: example input", function () {
            const result = expenseReportA(`${__dirname}/example.txt`);
            expect(result).to.equal(514579);
        });

        specify("expense report: assignment", function () {
            const result = expenseReportA(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(1020084);
        });
    });

    context("B", function () {
        specify("expense report: example input", function () {
            const result = expenseReportB(`${__dirname}/example.txt`);
            expect(result).to.equal(241861950);
        });

        specify("expense report: assignment", function () {
            const result = expenseReportB(`${__dirname}/input.txt`);
            console.log(result);
            expect(result).to.equal(295086480);
        });
    });
})