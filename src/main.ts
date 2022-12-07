import prompts from "npm:prompts";

import { Day1 } from "./day01/main.ts";
import { Day2 } from "./day02/main.ts";
import { Day3 } from "./day03/main.ts";
import { Day4 } from "./day04/main.ts";
import { Day5 } from "./day05/main.ts";
import { Day6 } from "./day06/main.ts";
import { Day7 } from "./day07/main.ts";

const puzzles = [
  new Day1(),
  new Day2(),
  new Day3(),
  new Day4(),
  new Day5(),
  new Day6(),
  new Day7(),
];

const { day } = (await prompts({
  type: "number",
  name: "day",
  message: "Which day's puzzle should be run?",
  min: 1,
  max: puzzles.length,
})) as { day: number };

const input = Deno.readTextFileSync(
  `./src/day${String(day).padStart(2, "0")}/input.txt`,
);

console.log(`Day ${day}:`);
console.log("-------------------");
console.time("duration");

console.log(`Part 1: ${puzzles[day - 1].part1(input)}`);
console.log(`Part 2: ${puzzles[day - 1].part2(input)}`);

console.log("-------------------");

console.timeEnd("duration");
