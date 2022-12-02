import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.161.0/testing/bdd.ts";
import { calculateScore, calculateStrategy, Day2 } from "./main.ts";

const day2 = new Day2();

describe("part 1", () => {
  describe("single strategy", () => {
    it("should calculate a win condition", () => {
      assertEquals(calculateScore("A Y"), 8);
    });

    it("should calculate a lose condition", () => {
      assertEquals(calculateScore("B X"), 1);
    });

    it("should calculate a draw condition", () => {
      assertEquals(calculateScore("C Z"), 6);
    });
  });

  it("should return the correct result for the example", () => {
    const input = `A Y
        B X
        C Z`;

    assertEquals(day2.part1(input), 15);
  });

  it("should return the correct result for the input", () => {
    const input = Deno.readTextFileSync("./src/day2/input.txt");

    assertEquals(day2.part1(input), 11666);
  });
});

describe("part 2", () => {
  describe("proper strategy", () => {
    it("should end in a draw", () => {
      assertEquals(calculateStrategy("A Y"), 4);
    });

    it("should end in a loss", () => {
      assertEquals(calculateStrategy("B X"), 1);
    });

    it("should end in a win", () => {
      assertEquals(calculateStrategy("C Z"), 7);
    });
  });

  it("should return the correct result for the example", () => {
    const input = `A Y
        B X
        C Z`;

    assertEquals(day2.part2(input), 12);
  });

  it("should return the correct result for the input", () => {
    const input = Deno.readTextFileSync("./src/day2/input.txt");

    assertEquals(day2.part2(input), 12767);
  });
});
