import {
  assert,
  assertEquals,
  assertFalse,
} from "https://deno.land/std@0.161.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.161.0/testing/bdd.ts";
import { calculateScenicScore, Day8, isVisible } from "./main.ts";

const day8 = new Day8();

describe("part 1", () => {
  describe("check if tree is visible", () => {
    it("should find visible trees", () => {
      const grid = `30373
        25512
        65332
        33549
        35390`
        .split("\n")
        .map((line) =>
          line
            .trim()
            .split("")
            .map((n) => parseInt(n))
        );

      assert(isVisible(grid, { x: 1, y: 1 }));
      assert(isVisible(grid, { x: 2, y: 1 }));
      assert(isVisible(grid, { x: 1, y: 2 }));
      assert(isVisible(grid, { x: 4, y: 2 }));
      assert(isVisible(grid, { x: 2, y: 3 }));
    });

    it("should find invisible trees", () => {
      const grid = `30373
          25512
          65332
          33549
          35390`
        .split("\n")
        .map((line) =>
          line
            .trim()
            .split("")
            .map((n) => parseInt(n))
        );

      assertFalse(isVisible(grid, { x: 3, y: 1 }));
      assertFalse(isVisible(grid, { x: 2, y: 2 }));
      assertFalse(isVisible(grid, { x: 1, y: 3 }));
      assertFalse(isVisible(grid, { x: 3, y: 3 }));
    });
  });

  it("should return the correct result for the example", () => {
    const input = `30373
          25512
          65332
          33549
          35390`;

    assertEquals(day8.part1(input), 21);
  });

  it("should return the correct result for the input", () => {
    const input = Deno.readTextFileSync("./src/day08/input.txt");
    assertEquals(day8.part1(input), 1733);
  });
});

describe("part 2", () => {
  describe("calculate scenic score", () => {
    it("should find the score of 4", () => {
      const grid = `30373
          25512
          65332
          33549
          35390`
        .split("\n")
        .map((line) =>
          line
            .trim()
            .split("")
            .map((n) => parseInt(n))
        );

      assertEquals(calculateScenicScore(grid, { x: 2, y: 1 }), 4);
    });

    it("should find the score of 8", () => {
      const grid = `30373
          25512
          65332
          33549
          35390`
        .split("\n")
        .map((line) =>
          line
            .trim()
            .split("")
            .map((n) => parseInt(n))
        );

      assertEquals(calculateScenicScore(grid, { x: 2, y: 3 }), 8);
    });
  });

  it("should return the correct result for the example", () => {
    const input = `30373
          25512
          65332
          33549
          35390`;

    assertEquals(day8.part2(input), 8);
  });

  it("should return the correct result for the input", () => {
    const input = Deno.readTextFileSync("./src/day08/input.txt");
    assertEquals(day8.part2(input), 284648);
  });
});
