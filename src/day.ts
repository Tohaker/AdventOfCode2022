export abstract class Day {
  abstract part1(input: string): Promise<number> | number;
  abstract part2(input: string): Promise<number> | number;
}
