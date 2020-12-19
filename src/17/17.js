const { readFileSync } = require("fs");

// TODO: rewrite using a map (string coord -> # | .)!

const parseLayer = layer => layer.split("\n").map(row => row.split(""));
const layerToString = layer => layer.map(row => row.join("")).join("\n");

const directions3D = [0, -1, 1].flatMap(x => [0, -1, 1].flatMap(y => [0, -1, 1].map(z => [x, y, z]))).slice(1);
const isActive = (cube, x, y, z) => (cube[z] && cube[z][y]) ? cube[z][y][x] === "#" : false;
const activeNeighbors = (cube, x, y, z) => 
    directions3D.reduce((c, [xd, yd, zd]) => isActive(cube, x + xd, y + yd, z + zd) ? c + 1 : c, 0);
const nextCell = (cube, x, y, z) => {
    const currentlyActive = isActive(cube, x, y, z);
    const neighbors = activeNeighbors(cube, x, y, z);
    return (neighbors === 3 || currentlyActive && neighbors === 2) ? "#" : ".";
};
const expandCube = cube => {
    const xy = cube[0].length + 2;

    return [
        new Array(xy).fill(new Array(xy).fill(".")), 
        ...cube.map(zs => [new Array(xy).fill("."), ...zs.map(ys => [".", ...ys, "."]), new Array(xy).fill(".")]), 
        new Array(xy).fill(new Array(xy).fill("."))
    ];
};
const nextCube = cube => {
    const newCube = expandCube(cube);
    return newCube.map((layer, z) => layer.map((row, y) => row.map((_, x) => nextCell(newCube, x, y, z))));
};

const directions4D = [0, -1, 1].flatMap(x => [0, -1, 1].flatMap(y => [0, -1, 1].flatMap(z => [0, -1, 1].map(w => [x, y, z, w])))).slice(1);
const isActive4D = (cube, x, y, z, w) => (cube[w] && cube[w][z] && cube[w][z][y]) ? cube[w][z][y][x] === "#" : false;
const activeNeighbors4D = (cube, x, y, z, w) => 
    directions4D.reduce((c, [xd, yd, zd, wd]) => isActive4D(cube, x + xd, y + yd, z + zd, w + wd) ? c + 1 : c, 0);
const nextCell4D = (cube, x, y, z, w) => {
    const currentlyActive = isActive4D(cube, x, y, z, w);
    const neighbors = activeNeighbors4D(cube, x, y, z, w);
    return (neighbors === 3 || currentlyActive && neighbors === 2) ? "#" : ".";
};
const expandCube4D = cube => {
    const xy = cube[0][0].length + 2;
    const z = cube[0].length;

    return [
        new Array(z).fill(new Array(xy).fill(new Array(xy).fill("."))),
        ...cube.map(expandCube),
        new Array(z).fill(new Array(xy).fill(new Array(xy).fill("."))),
    ]
};
const nextCube4D = cube => {
    const newCube = expandCube4D(cube);
    return newCube.map((cube, w) => cube.map((layer, z) => layer.map((row, y) => row.map((_, x) => nextCell4D(newCube, x, y, z, w)))));
};

const solveA = path => {
    let cube = [parseLayer(readFileSync(path, "utf-8"))];

    let cycles = 0;
    while (cycles < 6) {
        cube = nextCube(cube);
        cycles++;
    }

    return cube.flatMap(l => l.flatMap(r => r.map(c => c === "#" ? 1 : 0))).reduce((a, b) => a + b, 0);
};
const solveB = path => {
    let cube = [ [ parseLayer(readFileSync(path, "utf-8")) ] ];

    let cycles = 0;
    while (cycles < 5) {
        cube = nextCube4D(cube);
        cycles++;
    }

    return cube.flatMap(cu => cu.flatMap(l => l.flatMap(r => r.map(c => c === "#" ? 1 : 0)))).reduce((a, b) => a + b, 0);
};

module.exports =  {
    parseLayer,
    layerToString,
    expandCube,
    nextCell,
    nextCube,
    solveA,
    solveB,
};