import { Day } from "../day.ts";

const scoreMap: Record<string, number> = {
  "A X": 4,
  "A Y": 8,
  "A Z": 3,
  "B X": 1,
  "B Y": 5,
  "B Z": 9,
  "C X": 7,
  "C Y": 2,
  "C Z": 6,
};

const strategyMap: Record<string, number> = {
  "A X": 3,
  "A Y": 4,
  "A Z": 8,
  "B X": 1,
  "B Y": 5,
  "B Z": 9,
  "C X": 2,
  "C Y": 6,
  "C Z": 7,
};

export const calculateScore = (game: string) => scoreMap[game.trim()];

export const calculateStrategy = (game: string) => strategyMap[game.trim()];

export class Day2 extends Day {
  constructor() {
    super();
  }

  part1(input: string) {
    return input.split("\n").reduce((acc, l) => acc + calculateScore(l), 0);
  }

  part2(input: string) {
    return input.split("\n").reduce((acc, l) => acc + calculateStrategy(l), 0);
  }
}
