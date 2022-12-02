import prompts from "npm:prompts";

import { Day1 } from "./day1/main.ts";
import { Day2 } from "./day2/main.ts";

const puzzles = [new Day1(), new Day2()];

const { day } = (await prompts({
  type: "number",
  name: "day",
  message: "Which day's puzzle should be run?",
  min: 1,
  max: puzzles.length,
})) as { day: number };

const input = Deno.readTextFileSync(`./src/day${day}/input.txt`);

console.log(`Day ${day}:`);
console.log("-------------------");
console.time("duration");

console.log(`Part 1: ${puzzles[day - 1].part1(input)}`);
console.log(`Part 2: ${puzzles[day - 1].part2(input)}`);

console.log("-------------------");

console.timeEnd("duration");
