import { Day } from "../day.ts";

const createElfGroups = (group: string) => {
  const [elf1, elf2] = group.split(",").map((range) => {
    const [start, end] = range.split("-");

    return { start: parseInt(start), end: parseInt(end) };
  });

  return [elf1, elf2] as const;
};

export const checkFullOverlaps = (group: string) => {
  const [elf1, elf2] = createElfGroups(group);

  return (
    (elf1.start <= elf2.start && elf1.end >= elf2.end) ||
    (elf2.start <= elf1.start && elf2.end >= elf1.end)
  );
};

export const checkPartialOverlaps = (group: string) => {
  const [elf1, elf2] = createElfGroups(group);

  const elf1List = Array(elf1.end - elf1.start + 1)
    .fill(0)
    .map((_v, i) => elf1.start + i);

  const elf2List = Array(elf2.end - elf2.start + 1)
    .fill(0)
    .map((_v, i) => elf2.start + i);

  return elf1List.filter((a) => elf2List.includes(a)).length > 0;
};

export class Day4 extends Day {
  part1(input: string): number | Promise<number> {
    return input
      .split("\n")
      .reduce((acc, l) => (checkFullOverlaps(l.trim()) ? acc + 1 : acc), 0);
  }

  part2(input: string): number | Promise<number> {
    return input
      .split("\n")
      .reduce((acc, l) => (checkPartialOverlaps(l.trim()) ? acc + 1 : acc), 0);
  }
}
