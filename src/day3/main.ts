import { Day } from "../day.ts";

const convertStringToPriority = (item: string) => {
  const asciiValue = item.charCodeAt(0);

  if (item === item.toLowerCase()) {
    return asciiValue - 96;
  } else {
    return asciiValue - 38;
  }
};

export const findDuplicateItem = (rucksack: string) => {
  const firstCompartment = rucksack.slice(0, rucksack.length / 2).split("");
  const secondCompartment = rucksack.slice(rucksack.length / 2).split("");

  const commonItem = firstCompartment.filter((item) =>
    secondCompartment.includes(item)
  )[0];

  return convertStringToPriority(commonItem);
};

export const findCommonItem = (rucksacks: string[]) => {
  const first = rucksacks[0].split("");
  const second = rucksacks[1].split("");
  const third = rucksacks[2].split("");

  const commonItem = first.filter(
    (item) => second.includes(item) && third.includes(item)
  )[0];

  return convertStringToPriority(commonItem);
};

export class Day3 extends Day {
  part1(input: string): number | Promise<number> {
    return input
      .split("\n")
      .reduce((acc, l) => acc + findDuplicateItem(l.trim()), 0);
  }

  part2(input: string): number | Promise<number> {
    const rucksacks = input.split("\n").map((l) => l.trim());
    const priorities: number[] = [];

    const chunkSize = 3;
    for (let i = 0; i < rucksacks.length; i += chunkSize) {
      const group = rucksacks.slice(i, i + chunkSize);
      priorities.push(findCommonItem(group));
    }

    return priorities.reduce((acc, n) => acc + n, 0);
  }
}
