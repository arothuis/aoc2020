const { linesFromFile } = require("../core.js");

const DIRECTIONS = { N: {x: 0, y: 1, i: 0}, E: {x: 1, y: 0, i: 1}, S: {x: 0, y: -1, i: 2}, W: {x: -1, y: 0, i: 3} };
const MOVES_A = {
    NESW: (v, d1) => ([x, y, d0]) => [x + DIRECTIONS[d1].x * v, y + DIRECTIONS[d1].y * v, d0],
    L: v => ([x, y, d]) => [x, y, Object.keys(DIRECTIONS)[(4 + DIRECTIONS[d].i - v / 90) % 4]],
    R: v => ([x, y, d]) => [x, y, Object.keys(DIRECTIONS)[(4 + DIRECTIONS[d].i + v / 90) % 4]],
    F: v => ([x, y, d]) => [DIRECTIONS[d].x * v + x, DIRECTIONS[d].y * v + y, d],
};
const rotate = (x, y, v) => v === 90 ? [-y, x] : v === 180 ? [-x, -y] : [y, -x];
const MOVES_B = {
    NESW: (v, d) => ([sx, sy, wx, wy]) => [sx, sy, wx + DIRECTIONS[d].x * v, wy + DIRECTIONS[d].y * v],
    L: v => ([sx, sy, wx, wy]) => [sx, sy, ...rotate(wx, wy, v)],
    R: v => ([sx, sy, wx, wy]) => [sx, sy, ...rotate(wx, wy, 360 - v)],
    F: v => ([sx, sy, wx, wy]) => [sx + wx * v, sy + wy * v, wx, wy],
};

const solveA = path => {
    const [x, y] = linesFromFile(path)
        .map(l => (MOVES_A[l[0]] || MOVES_A["NESW"])(+l.slice(1), l[0]))
        .reduce((current, m) => m(current), [0, 0, "E"]);
    return Math.abs(x) + Math.abs(y);
};
const solveB = path => {
    const [sx, sy] = linesFromFile(path)
        .map(l => (MOVES_B[l[0]] || MOVES_B["NESW"])(+l.slice(1), l[0]))
        .reduce((current, m) => m(current), [0, 0, 10, 1]);
    return Math.abs(sx) + Math.abs(sy);
};

module.exports =  {
    MOVES_A,
    solveA,
    solveB,
};