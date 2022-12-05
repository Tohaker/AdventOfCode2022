import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.161.0/testing/bdd.ts";
import {
  Day5,
  parseCrates,
  performInstruction,
  performNewInstruction,
} from "./main.ts";

const day5 = new Day5();

describe("part 1", () => {
  const exampleStartingPositions = [["Z", "N"], ["M", "C", "D"], ["P"]];

  describe("parse crate input", () => {
    it("should read in the crates correctly", () => {
      const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `.split("\n");

      assertEquals(parseCrates(input), exampleStartingPositions);
    });
  });

  describe("perform one instruction", () => {
    it("should be able to move one crate", () => {
      assertEquals(
        performInstruction("move 1 from 2 to 1", exampleStartingPositions),
        [["Z", "N", "D"], ["M", "C"], ["P"]],
      );
    });

    it("should be able to move multiple crates", () => {
      assertEquals(
        performInstruction(
          "move 3 from 1 to 3",
          performInstruction("move 1 from 2 to 1", exampleStartingPositions),
        ),
        [[], ["M", "C"], ["P", "D", "N", "Z"]],
      );
    });
  });

  it("should return the correct result for the example", () => {
    const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

    assertEquals(day5.part1(input), "CMZ");
  });

  it("should return the correct result for the input", () => {
    const input = Deno.readTextFileSync("./src/day05/input.txt");

    assertEquals(day5.part1(input), "GFTNRBZPF");
  });
});

describe("part 2", () => {
  const exampleStartingPositions = [["Z", "N"], ["M", "C", "D"], ["P"]];

  describe("perform one instruction", () => {
    it("should be able to move one crate", () => {
      assertEquals(
        performNewInstruction("move 1 from 2 to 1", exampleStartingPositions),
        [["Z", "N", "D"], ["M", "C"], ["P"]],
      );
    });

    it("should be able to move multiple crates", () => {
      assertEquals(
        performNewInstruction(
          "move 3 from 1 to 3",
          performNewInstruction("move 1 from 2 to 1", exampleStartingPositions),
        ),
        [[], ["M", "C"], ["P", "Z", "N", "D"]],
      );
    });
  });

  it("should return the correct result for the example", () => {
    const input = `    [D]    
[N] [C]    
[Z] [M] [P]
  1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

    assertEquals(day5.part2(input), "MCD");
  });

  it("should return the correct result for the input", () => {
    const input = Deno.readTextFileSync("./src/day05/input.txt");

    assertEquals(day5.part2(input), "VRQWPDSGP");
  });
});
