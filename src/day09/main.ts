import { Day } from "../day.ts";

export enum Direction {
  UP = "U",
  DOWN = "D",
  LEFT = "L",
  RIGHT = "R",
}

type Position = { x: number; y: number };

type GetTailPositionArgs = {
  direction?: Direction;
  head: Position;
  tail: Position;
};

const isAdjacentX = (p1: Position, p2: Position) =>
  Math.abs(p1.x - p2.x) === 1 && Math.abs(p1.y - p2.y) === 0;
const isAdjacentY = (p1: Position, p2: Position) =>
  Math.abs(p1.y - p2.y) === 1 && Math.abs(p1.x - p2.x) === 0;

const isRightOfTail = (head: Position, tail: Position) => head.x > tail.x;
const isLeftOfTail = (head: Position, tail: Position) => head.x < tail.x;
const isAboveTail = (head: Position, tail: Position) => head.y > tail.y;
const isBelowTail = (head: Position, tail: Position) => head.y < tail.y;

export const getTailPosition = ({
  direction,
  head,
  tail,
}: GetTailPositionArgs): Position => {
  // Overlapping means the tail doesn't move
  if (!direction || (head.x === tail.x && head.y === tail.y)) {
    return tail;
  }

  switch (direction) {
    case Direction.UP:
      if (isAdjacentX(head, tail) || isBelowTail(head, tail)) return tail;
      return head;
    case Direction.DOWN:
      if (isAdjacentX(head, tail) || isAboveTail(head, tail)) return tail;
      return head;
    case Direction.LEFT:
      if (isAdjacentY(head, tail) || isRightOfTail(head, tail)) return tail;
      return head;
    case Direction.RIGHT:
      if (isAdjacentY(head, tail) || isLeftOfTail(head, tail)) return tail;
      return head;
  }
};

export class Day9 extends Day {
  part1(input: string): string | number | Promise<number> {
    const commands = input.split("\n").map((l) => {
      const [dir, steps] = l.trim().split(" ");

      return {
        direction: dir as Direction,
        steps: parseInt(steps),
      };
    });

    const start: Position = { x: 0, y: 0 };

    let head = start;
    let tail = start;

    const tailPositions = new Set<string>();

    commands.forEach(({ direction, steps }) => {
      for (let i = 0; i < steps; i++) {
        tail = getTailPosition({ direction, head, tail });

        tailPositions.add(JSON.stringify(tail));

        switch (direction) {
          case Direction.UP:
            head = { ...head, y: head.y + 1 };
            break;
          case Direction.DOWN:
            head = { ...head, y: head.y - 1 };
            break;
          case Direction.LEFT:
            head = { ...head, x: head.x - 1 };
            break;
          case Direction.RIGHT:
            head = { ...head, x: head.x + 1 };
            break;
        }
      }
    });

    return tailPositions.size;
  }

  part2(input: string): string | number | Promise<number> {
    const commands = input.split("\n").map((l) => {
      const [dir, steps] = l.trim().split(" ");

      return {
        direction: dir as Direction,
        steps: parseInt(steps),
      };
    });

    const start: Position = { x: 0, y: 0 };

    let head = start;
    let isRopeSlack = true;

    const tails = Array.from(Array(9), () => start);

    const tailPositions = new Set<string>();

    commands.forEach(({ direction, steps }) => {
      for (let i = 0; i < steps; i++) {
        for (let n = 0; n < 9; n++) {
          const isSlack = tails[n].x !== start.x && tails[n].y !== start.y;

          tails[n] = getTailPosition({
            direction: n !== 0 && isSlack ? undefined : direction,
            head: n === 0 ? head : tails[n - 1],
            tail: tails[n],
          });

          console.log({ i, n, tail: tails[n] });
        }

        console.log("---");

        switch (direction) {
          case Direction.UP:
            head = { ...head, y: head.y + 1 };
            break;
          case Direction.DOWN:
            head = { ...head, y: head.y - 1 };
            break;
          case Direction.LEFT:
            head = { ...head, x: head.x - 1 };
            break;
          case Direction.RIGHT:
            head = { ...head, x: head.x + 1 };
            break;
        }

        tailPositions.add(JSON.stringify(tails[8]));
      }
    });

    return tailPositions.size;
  }
}
