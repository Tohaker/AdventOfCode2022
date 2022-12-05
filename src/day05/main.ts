import { Day } from "../day.ts";

export const parseCrates = (rows: string[]) => {
  const lineLength = rows[0].length + 1;

  const crates: string[][] = Array.from(Array(lineLength / 4), () => []);

  rows.slice(0, -1).forEach((row) => {
    const cratesInRow = row.match(/.{1,4}/g);

    if (cratesInRow) {
      cratesInRow.forEach((crate, i) => {
        if (crate.trim() !== "") {
          crates[i].unshift(crate.charAt(1));
        }
      });
    }
  });

  return crates;
};

const parseInstruction = (instruction: string) => {
  const [qty, start, end] = instruction.match(/\d+/gm)?.map((n) => {
    return parseInt(n);
  }) ?? [];

  return { qty, start, end };
};

export const performInstruction = (
  instruction: string,
  positions: string[][],
) => {
  const newPositions: string[][] = structuredClone(positions);

  const { qty, start, end } = parseInstruction(instruction);

  for (let i = 0; i < qty; i++) {
    const crate = newPositions[start - 1].pop();
    crate && newPositions[end - 1].push(crate);
  }

  return newPositions;
};

export const performNewInstruction = (
  instruction: string,
  positions: string[][],
) => {
  const newPositions: string[][] = structuredClone(positions);

  const { qty, start, end } = parseInstruction(instruction);

  const crates = newPositions[start - 1].splice(
    newPositions[start - 1].length - qty,
    qty,
  );

  newPositions[end - 1].push(...crates);

  return newPositions;
};

const setupPart = (input: string) => {
  const lines = input.split("\n");
  const inputBreak = lines.findIndex((l) => l.trim() === "");

  const startingPositions = parseCrates(lines.slice(0, inputBreak));
  const instructions = lines.slice(inputBreak + 1).map((l) => l.trim());

  return { startingPositions, instructions };
};

const runPart =
  (fn: typeof performInstruction | typeof performNewInstruction) =>
  ({
    startingPositions,
    instructions,
  }: {
    startingPositions: string[][];
    instructions: string[];
  }) => {
    let positions: string[][] = structuredClone(startingPositions);

    instructions.forEach((ins) => {
      positions = fn(ins, positions);
    });

    return positions.reduce((acc, pos) => acc + pos[pos.length - 1], "");
  };

export class Day5 extends Day {
  part1(input: string): string | number | Promise<number> {
    return runPart(performInstruction)(setupPart(input));
  }

  part2(input: string): string | number | Promise<number> {
    return runPart(performNewInstruction)(setupPart(input));
  }
}
