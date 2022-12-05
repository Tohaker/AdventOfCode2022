import { Day } from "../day.ts";

export const performInstruction = (
  instruction: string,
  positions: string[][]
) => {
  const newPositions: string[][] = structuredClone(positions);

  const [qty, start, end] =
    instruction.match(/\d+/gm)?.map((n) => {
      return parseInt(n);
    }) ?? [];

  for (let i = 0; i < qty; i++) {
    const crate = newPositions[start - 1].pop();
    crate && newPositions[end - 1].push(crate);
  }

  return newPositions;
};

export const performNewInstruction = (
  instruction: string,
  positions: string[][]
) => {
  const newPositions: string[][] = structuredClone(positions);

  const [qty, start, end] =
    instruction.match(/\d+/gm)?.map((n) => {
      return parseInt(n);
    }) ?? [];

  const crates = newPositions[start - 1].splice(
    newPositions[start - 1].length - qty,
    qty
  );

  newPositions[end - 1].push(...crates);

  return newPositions;
};

export class Day5 extends Day {
  part1(input: string): string | number | Promise<number> {
    if (input === "example") {
      const exampleStartingPositions = [["Z", "N"], ["M", "C", "D"], ["P"]];
      const instructions = `move 1 from 2 to 1
      move 3 from 1 to 3
      move 2 from 2 to 1
      move 1 from 1 to 2`
        .split(`\n`)
        .map((l) => l.trim());

      let positions: string[][] = structuredClone(exampleStartingPositions);

      instructions.forEach((ins) => {
        positions = performInstruction(ins, positions);
      });

      return positions.reduce((acc, pos) => acc + pos[pos.length - 1], "");
    } else {
      const startingPositions = [
        ["N", "B", "D", "T", "V", "G", "Z", "J"],
        ["S", "R", "M", "D", "W", "P", "F"],
        ["V", "C", "R", "S", "Z"],
        ["R", "T", "J", "Z", "P", "H", "G"],
        ["T", "C", "J", "N", "D", "Z", "Q", "F"],
        ["N", "V", "P", "W", "G", "S", "F", "M"],
        ["G", "C", "V", "B", "P", "Q"],
        ["Z", "B", "P", "N"],
        ["W", "P", "J"],
      ];

      const input = Deno.readTextFileSync("./src/day05/input.txt");

      const instructions = input
        .split("\n")
        .slice(10)
        .map((l) => l.trim());
      let positions: string[][] = structuredClone(startingPositions);

      instructions.forEach((ins) => {
        positions = performInstruction(ins, positions);
      });

      return positions.reduce((acc, pos) => acc + pos[pos.length - 1], "");
    }
  }

  part2(input: string): string | number | Promise<number> {
    if (input === "example") {
      const exampleStartingPositions = [["Z", "N"], ["M", "C", "D"], ["P"]];
      const instructions = `move 1 from 2 to 1
        move 3 from 1 to 3
        move 2 from 2 to 1
        move 1 from 1 to 2`
        .split(`\n`)
        .map((l) => l.trim());

      let positions: string[][] = structuredClone(exampleStartingPositions);

      instructions.forEach((ins) => {
        positions = performNewInstruction(ins, positions);
      });

      return positions.reduce((acc, pos) => acc + pos[pos.length - 1], "");
    } else {
      const startingPositions = [
        ["N", "B", "D", "T", "V", "G", "Z", "J"],
        ["S", "R", "M", "D", "W", "P", "F"],
        ["V", "C", "R", "S", "Z"],
        ["R", "T", "J", "Z", "P", "H", "G"],
        ["T", "C", "J", "N", "D", "Z", "Q", "F"],
        ["N", "V", "P", "W", "G", "S", "F", "M"],
        ["G", "C", "V", "B", "P", "Q"],
        ["Z", "B", "P", "N"],
        ["W", "P", "J"],
      ];

      const input = Deno.readTextFileSync("./src/day05/input.txt");

      const instructions = input
        .split("\n")
        .slice(10)
        .map((l) => l.trim());
      let positions: string[][] = structuredClone(startingPositions);

      instructions.forEach((ins) => {
        positions = performNewInstruction(ins, positions);
      });

      return positions.reduce((acc, pos) => acc + pos[pos.length - 1], "");
    }
  }
}
