import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.161.0/testing/bdd.ts";

import { calculateFinalFloor, runPart1, runPart2 } from "./main.ts";

describe("should equal correct floor", () => {
  [
    {
      input: "(())",
      expected: 0,
    },
    {
      input: "()()",
      expected: 0,
    },
    {
      input: "(((",
      expected: 3,
    },
    {
      input: "(()(()(",
      expected: 3,
    },
    {
      input: "))(((((",
      expected: 3,
    },
    {
      input: "())",
      expected: -1,
    },
    {
      input: "))(",
      expected: -1,
    },
    {
      input: ")))",
      expected: -3,
    },
    {
      input: ")())())",
      expected: -3,
    },
  ].forEach(({ input, expected }) =>
    it(`should return ${expected} for ${input}`, () => {
      assertEquals(calculateFinalFloor(input).floor, expected);
    })
  );
});

describe("Part 1", () => {
  it("should return the correct answer", () => {
    assertEquals(runPart1(), 74);
  });
});

describe("Part 2", () => {
  it("should return the correct answer", () => {
    assertEquals(runPart2(), 1795);
  });
});
