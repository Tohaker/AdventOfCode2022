import { Day } from "../day.ts";

export enum Direction {
  UP = "U",
  DOWN = "D",
  LEFT = "L",
  RIGHT = "R",
}

type Position = { x: number; y: number };

type GetTailPositionArgs = {
  direction: Direction;
  head: Position;
  tail: Position;
};

const isAdjacentX = (p1: Position, p2: Position) =>
  Math.abs(p1.x - p2.x) === 1 && Math.abs(p1.y - p2.y) === 0;
const isAdjacentY = (p1: Position, p2: Position) =>
  Math.abs(p1.y - p2.y) === 1 && Math.abs(p1.x - p2.x) === 0;

export const getTailPosition = ({
  direction,
  head,
  tail,
}: GetTailPositionArgs): Position => {
  // Overlapping means the tail doesn't move
  if (head.x === tail.x && head.y === tail.y) {
    return tail;
  }

  switch (direction) {
    case Direction.UP:
    case Direction.DOWN:
      if (isAdjacentX(head, tail)) return tail;
      return head;
    case Direction.LEFT:
    case Direction.RIGHT:
      if (isAdjacentY(head, tail)) return tail;
      return head;
    default:
      return { x: -1, y: -1 };
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

        console.log({ direction, steps, i, head, tail });
      }
    });

    tailPositions.forEach((k) => console.log(k));

    return tailPositions.size;
  }

  part2(input: string): string | number | Promise<number> {
    return 0;
  }
}
