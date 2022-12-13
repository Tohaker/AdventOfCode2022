import { Day } from "../day.ts";

type Packet = Array<Packet> | number[];

const compareLists = (left: Packet, right: Packet): boolean | undefined => {
  const longestLength = Math.max(left.length, right.length);

  for (let i = 0; i < longestLength; i++) {
    const currentL = left[i];
    const currentR = right[i];

    if (!currentL && !!currentR) return true;
    if (!!currentL && !currentR) return false;

    if (typeof currentL === "number" && typeof currentR === "number") {
      if (currentL === currentR) continue;
      return currentL < currentR;
    } else if (Array.isArray(currentL) && Array.isArray(currentR)) {
      const output = compareLists(currentL, currentR);

      if (!output) continue;
      return output;
    } else if (Array.isArray(currentL) && typeof currentR === "number") {
      const output = compareLists(currentL, [currentR]);

      if (!output) continue;
      return output;
    } else if (typeof currentL === "number" && Array.isArray(currentR)) {
      const output = compareLists([currentL], currentR);

      if (!output) continue;
      return output;
    }
  }
};

export const inRightOrder = (l: string, r: string) => {
  const left: Packet = JSON.parse(l);
  const right: Packet = JSON.parse(r);

  return compareLists(left, right) !== false;
};

export class Day13 extends Day {
  part1(input: string): string | number | Promise<number> {
    const packets = input.split(/\n\s*\n/).map((lines) => {
      const parts = lines.split("\n");
      return {
        left: parts[0],
        right: parts[1],
      };
    });

    return packets.reduce((acc, { left, right }, i) => {
      const yes = inRightOrder(left, right);

      console.log({ yes, left, right, i });

      if (yes) return acc + i + 1;
      return acc;
    }, 0);
  }

  part2(input: string): string | number | Promise<number> {
    return 0;
  }
}
