import { Day } from "../day.ts";

type Monkey = {
  items: number[];
  inspectionCount: number;
  testValue: number;
  operation: (old: number) => number;
  test: (value: number) => number;
};

let worryModifier = 3;

export const parseMonkey = (details: string): Monkey => {
  const lines = details.split("\n").slice(1);

  const items = lines[0].match(/\d+/gm)?.map((n) => parseInt(n)) ?? [];

  const operationComponents =
    lines[1]
      .match(/old|\d+|\*|\+/gm)
      ?.map((c) => (isNaN(+c) ? c : parseInt(c))) ?? [];
  const operation = (old: number) => {
    if (operationComponents[1] === "+") {
      return (
        old +
        (operationComponents[2] === "old"
          ? old
          : (operationComponents[2] as number))
      );
    } else {
      return (
        old *
        (operationComponents[2] === "old"
          ? old
          : (operationComponents[2] as number))
      );
    }
  };

  const testValue = lines[2].match(/\d+/gm)?.map((n) => parseInt(n))[0] ?? 1;

  const test = (value: number) => {
    const trueCase = lines[3].match(/\d+/gm)?.map((n) => parseInt(n))[0] ?? -1;
    const falseCase = lines[4].match(/\d+/gm)?.map((n) => parseInt(n))[0] ?? -1;

    return value % testValue === 0 ? trueCase : falseCase;
  };

  return {
    items,
    inspectionCount: 0,
    testValue,
    operation,
    test,
  };
};

export const runRound = (monkeys: Monkey[], divisors: number) => {
  monkeys.forEach((monkey, _, m) => {
    monkey.inspectionCount += monkey.items.length;
    monkey.items
      .map(monkey.operation)
      .map((level) => Math.trunc(level / worryModifier) % divisors)
      .forEach((level) => m[monkey.test(level)].items.push(level));
    monkey.items = [];
  });

  return monkeys.reduce<{ items: number[]; inspectionCount: number }[]>(
    (acc, { items, inspectionCount }) => {
      return [...acc, { items, inspectionCount }];
    },
    []
  );
};

const runPart = (input: string, rounds: number) => {
  const monkeys = input.split(/\n\s*\n/).map((details) => parseMonkey(details));

  const divisors = monkeys
    .map(({ testValue }) => testValue)
    .reduce((acc, curr) => acc * curr);

  let roundResult: ReturnType<typeof runRound> = [];

  for (let i = 0; i < rounds; i++) {
    roundResult = runRound(monkeys, divisors);
  }

  return roundResult
    .map(({ inspectionCount }) => inspectionCount)
    .sort((a, b) => b - a)
    .splice(0, 2)
    .reduce((acc, curr) => acc * curr);
};

export class Day11 extends Day {
  part1(input: string): string | number | Promise<number> {
    return runPart(input, 20);
  }

  part2(input: string): string | number | Promise<number> {
    worryModifier = 1;

    return runPart(input, 10000);
  }
}
