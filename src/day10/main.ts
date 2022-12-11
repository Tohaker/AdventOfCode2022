import { Day } from "../day.ts";

export const runCycles = (instructions: string[], cycles: number[]) => {
  let x = 1;
  let cycle = 0;
  const values: number[] = [];

  instructions.forEach((instruction) => {
    if (cycles.includes(cycle)) {
      values.push(x);
    }

    cycle++;

    if (instruction !== "noop") {
      const [_, add] = instruction.split(" ");

      if (cycles.includes(cycle)) {
        values.push(x);
      }

      cycle++;

      x += parseInt(add);
    }
  });

  return values;
};

export const printToCRT = (instructions: string[]) => {
  let crt = "";
  let currentSprite = [0, 1, 2];

  let x = 1;
  let cycle = 0;

  instructions.forEach((instruction) => {
    if (cycle === 40) cycle = 0;

    if (currentSprite.includes(cycle)) {
      crt += "#";
    } else {
      crt += ".";
    }

    cycle++;

    if (instruction !== "noop") {
      const [_, add] = instruction.split(" ");

      if (cycle === 40) cycle = 0;

      if (currentSprite.includes(cycle)) {
        crt += "#";
      } else {
        crt += ".";
      }

      cycle++;

      x += parseInt(add);

      currentSprite = [x - 1, x, x + 1];
    }
  });

  return crt;
};

export class Day10 extends Day {
  part1(input: string): string | number | Promise<number> {
    const indices = [19, 59, 99, 139, 179, 219];

    const outputs = runCycles(
      input.split("\n").map((l) => l.trim()),
      indices,
    );

    return outputs.reduce((acc, curr, i) => acc + curr * (indices[i] + 1), 0);
  }

  part2(input: string): string | number | Promise<number> {
    const output = printToCRT(input.split("\n").map((l) => l.trim()));

    return output.match(/.{1,40}/g)?.join("\n") ?? "";
  }
}
