# Advent of Code 2020
[![Coverage Status](https://coveralls.io/repos/github/arothuis/aoc2020/badge.svg?branch=main)](https://coveralls.io/github/arothuis/aoc2020?branch=main)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=arothuis_aoc2020&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=arothuis_aoc2020)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=arothuis_aoc2020&metric=ncloc)](https://sonarcloud.io/dashboard?id=arothuis_aoc2020)

See: https://adventofcode.com/2020

## Purpose
1. Finish the daily exercises in JavaScript
2. Apply a declarative style as much as possible (escape hatches allowed)
3. Decompose into small, testable functions
4. Extensively test the implementation, preferably using Test-Driven Development (red, green, refactor)

## Declarative JavaScript
* Prefer functions and expressions over statements and statefulness
* Prefer const over let (no re-assignability)
* Although in other cases frowned upon, we allow the comma operator for binding variables in expressions
* Although problematic with regards to scoping, within expressions absence of const/let is tolerated (prefix with _ to mitigate risks)
* Fall back to a more imperative style if we run into JavaScript's limitations (recursion depth, etc.) or declaritivity is too inconvenient for current or future puzzles
