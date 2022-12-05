export abstract class Day {
  abstract part1(input: string): Promise<number> | number | string;
  abstract part2(input: string): Promise<number> | number | string;
}
