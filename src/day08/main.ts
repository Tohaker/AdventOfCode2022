import { Day } from "../day.ts";

export const isVisible = (
  grid: number[][],
  { x, y }: { x: number; y: number }
) => {
  const treeHeight = grid[y][x];
  const directions: number[][] = Array.from(Array(4), () => []);

  // Up
  for (let i = 0; i < y; i++) {
    directions[0].push(grid[i][x]);
  }

  // Down
  for (let i = y + 1; i < grid.length; i++) {
    directions[1].push(grid[i][x]);
  }

  // Left
  for (let j = 0; j < x; j++) {
    directions[2].push(grid[y][j]);
  }

  // Right
  for (let j = x + 1; j < grid[0].length; j++) {
    directions[3].push(grid[y][j]);
  }

  return directions.some((dir) => {
    for (let c = 0; c < dir.length; c++) {
      if (dir[c] >= treeHeight) {
        return false;
      }
    }

    return true;
  });
};

export const calculateScenicScore = (
  grid: number[][],
  { x, y }: { x: number; y: number }
) => {
  const treeHeight = grid[y][x];
  const directions: number[][] = Array.from(Array(4), () => []);

  // Up
  for (let i = 0; i < y; i++) {
    directions[0].push(grid[i][x]);
  }

  directions[0].reverse();

  // Down
  for (let i = y + 1; i < grid.length; i++) {
    directions[1].push(grid[i][x]);
  }

  // Left
  for (let j = 0; j < x; j++) {
    directions[2].push(grid[y][j]);
  }

  directions[2].reverse();

  // Right
  for (let j = x + 1; j < grid[0].length; j++) {
    directions[3].push(grid[y][j]);
  }

  return directions
    .map((dir) => {
      let current = 0;

      for (let c = 0; c < dir.length; c++) {
        current++;

        if (dir[c] >= treeHeight) {
          break;
        }
      }

      return current;
    })
    .reduce((acc, prev) => acc * prev, 1);
};

export class Day8 extends Day {
  part1(input: string): string | number | Promise<number> {
    const grid = input.split("\n").map((line) =>
      line
        .trim()
        .split("")
        .map((n) => parseInt(n))
    );

    let totalVisible = grid.length * 2 + (grid[0].length - 2) * 2;

    for (let y = 1; y < grid.length - 1; y++) {
      for (let x = 1; x < grid[0].length - 1; x++) {
        if (isVisible(grid, { x, y })) totalVisible++;
      }
    }

    return totalVisible;
  }

  part2(input: string): string | number | Promise<number> {
    const grid = input.split("\n").map((line) =>
      line
        .trim()
        .split("")
        .map((n) => parseInt(n))
    );

    const scenicScores: number[] = [];

    for (let y = 1; y < grid.length - 1; y++) {
      for (let x = 1; x < grid[0].length - 1; x++) {
        scenicScores.push(calculateScenicScore(grid, { x, y }));
      }
    }

    return scenicScores.sort((a, b) => b - a)[0];
  }
}
