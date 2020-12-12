const { linesFromFile } = require("../core.js");

const DIRECTIONS = { N: {x: 0, y: 1, i: 0}, E: {x: 1, y: 0, i: 1}, S: {x: 0, y: -1, i: 2}, W: {x: -1, y: 0, i: 3} };
const rotate = (x, y, v) => v === 90 ? [-y, x] : v === 180 ? [-x, -y] : [y, -x];
const MOVES_A = {
    NESW: (v, d1) => ([x, y, d0]) => [x + DIRECTIONS[d1].x * v, y + DIRECTIONS[d1].y * v, d0],
    L: v => ([x, y, d]) => [x, y, Object.keys(DIRECTIONS)[(4 + DIRECTIONS[d].i - v / 90) % 4]],
    R: v => ([x, y, d]) => [x, y, Object.keys(DIRECTIONS)[(4 + DIRECTIONS[d].i + v / 90) % 4]],
    F: v => ([x, y, d]) => [DIRECTIONS[d].x * v + x, DIRECTIONS[d].y * v + y, d],
};
const MOVES_B = {
    NESW: (v, d) => ([sx, sy, wx, wy]) => [sx, sy, wx + DIRECTIONS[d].x * v, wy + DIRECTIONS[d].y * v],
    L: v => ([sx, sy, wx, wy]) => [sx, sy, ...rotate(wx, wy, v)],
    R: v => ([sx, sy, wx, wy]) => [sx, sy, ...rotate(wx, wy, 360 - v)],
    F: v => ([sx, sy, wx, wy]) => [sx + wx * v, sy + wy * v, wx, wy],
};

const solve = (path, moves, initial) => {
    const [x, y] = linesFromFile(path)
        .map(l => (moves[l[0]] || moves.NESW)(+l.slice(1), l[0]))
        .reduce((current, move) => move(current), initial);
    return Math.abs(x) + Math.abs(y);
};

module.exports =  {
    MOVES_A,
    MOVES_B,
    solve,
};