const { readFileSync } = require("fs");

const parseLand = data => data.split("\n").map(l => l.split(""));
const elementOn = land => ([x, y]) => 
        land[x][y] ? land[x][y] 
                   : land[x][y % land[0].length]

const getPath = (land, coords) => coords.map(elementOn(land));
const plot = (f, end, coords = [], x = 0) => 
    end === 0 ? coords 
              : plot(f, end - 1, [...coords, [x, f(x)]], x + 1);

const countTreesOnPath = (land, coords) => 
    getPath(land, coords).filter(x => x === "#").length;

const solveA = file => (
    land = parseLand(readFileSync(file, "utf-8")),
    coords = plot(x => 3 * x, land.length),
    countTreesOnPath(land, coords)
);

const solveB = file => (
    land = parseLand(readFileSync(file, "utf-8")),
    [x => x, x => 3 * x, x => 5 * x, x => 7 * x, x => 0.5 * x]
        .map(f => countTreesOnPath(land, plot(f, land.length)))
        .reduce((acc, x) => x * acc,  1)
);

module.exports =  {
    parseLand,
    getPath,
    plot,
    countTreesOnPath,
    solveA,
    solveB
};