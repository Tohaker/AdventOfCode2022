import { Day } from "../day.ts";

export const MARKER_SIZE = 4;
export const MESSAGE_SIZE = 14;

export const findPacketStart = (buffer: string, windowSize: number) => {
  for (let i = 0; i < buffer.length - windowSize; i++) {
    const current = buffer.slice(i, i + windowSize).split("");

    const set = new Set();

    current.forEach((c) => set.add(c));

    if (set.size === windowSize) {
      return i + windowSize;
    }
  }

  return -1;
};

export class Day6 extends Day {
  part1(input: string): string | number | Promise<number> {
    return findPacketStart(input, MARKER_SIZE);
  }

  part2(input: string): string | number | Promise<number> {
    return findPacketStart(input, MESSAGE_SIZE);
  }
}
