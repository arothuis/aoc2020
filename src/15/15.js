const { numbersFromFile } = require("../core");

const solve = (path, max) => {
    const numbers = numbersFromFile(path, ",");
    const spoken = numbers.reduce((a, b, i) => ({...a, [b]: [i + 1]}), {});

    let speak = numbers[numbers.length - 1];
    let turn = numbers.length;

    while (turn < max) {
        turn++;
        if (spoken[speak].length < 2 || spoken[speak] === undefined) {
            speak = 0;
        } else {
            speak = spoken[speak][1] - spoken[speak][0];
        }

        if (spoken[speak] === undefined) {
            spoken[speak] = [];
        } else if (spoken[speak].length === 2) {
            spoken[speak].shift();
        }
        spoken[speak].push(turn);
    }

    return speak;
};

module.exports =  {
    solve
};