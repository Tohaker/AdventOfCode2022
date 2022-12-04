import {
  assertFalse,
  assert,
  assertEquals,
} from "https://deno.land/std@0.161.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.161.0/testing/bdd.ts";
import { checkFullOverlaps, checkPartialOverlaps, Day4 } from "./main.ts";

const day4 = new Day4();

describe("part 1", () => {
  describe("section assignments", () => {
    it("should return false for sections that do not overlap", () => {
      assertFalse(checkFullOverlaps("2-4,6-8"));
      assertFalse(checkFullOverlaps("2-3,4-5"));
    });

    it("should return false for sections that partially  overlap", () => {
      assertFalse(checkFullOverlaps("5-7,7-9"));
      assertFalse(checkFullOverlaps("2-6,4-8"));
    });

    it("should return true for sections that fully overlap", () => {
      assert(checkFullOverlaps("2-8,3-7"));
      assert(checkFullOverlaps("6-6,4-6"));
      assert(checkFullOverlaps("22-85,22-86"));
    });
  });

  it("should return the correct result for the example", () => {
    const input = `2-4,6-8
    2-3,4-5
    5-7,7-9
    2-8,3-7
    6-6,4-6
    2-6,4-8`;

    assertEquals(day4.part1(input), 2);
  });

  it("should return the correct result for the input", () => {
    const input = Deno.readTextFileSync("./src/day04/input.txt");

    assertEquals(day4.part1(input), 500);
  });
});

describe("part 2", () => {
  describe("section assignments", () => {
    it("should return false for sections that do not overlap", () => {
      assertFalse(checkPartialOverlaps("2-4,6-8"));
      assertFalse(checkPartialOverlaps("2-3,4-5"));
    });

    it("should return true for sections that partially  overlap", () => {
      assert(checkPartialOverlaps("5-7,7-9"));
      assert(checkPartialOverlaps("2-6,4-8"));
    });

    it("should return true for sections that fully overlap", () => {
      assert(checkPartialOverlaps("2-8,3-7"));
      assert(checkPartialOverlaps("6-6,4-6"));
      assert(checkPartialOverlaps("22-85,22-86"));
    });
  });

  it("should return the correct result for the example", () => {
    const input = `2-4,6-8
      2-3,4-5
      5-7,7-9
      2-8,3-7
      6-6,4-6
      2-6,4-8`;

    assertEquals(day4.part2(input), 4);
  });

  it("should return the correct result for the input", () => {
    const input = Deno.readTextFileSync("./src/day04/input.txt");

    assertEquals(day4.part2(input), 815);
  });
});
