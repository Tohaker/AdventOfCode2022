import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.161.0/testing/bdd.ts";

import { Day1, sumCalories } from "./main.ts";

const day1 = new Day1();

describe("part 1", () => {
  describe("calculates total calories", () => {
    it("should calculate total calories for a single line", () => {
      assertEquals(sumCalories([4000]), 4000);
    });

    it("should calculate total calories for multiple lines", () => {
      assertEquals(sumCalories([1000, 2000, 3000]), 6000);
    });
  });

  it("should return the correct result for the example", () => {
    const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

    assertEquals(day1.part1(input), 24000);
  }),
    it("should return the correct answer for the input", () => {
      assertEquals(
        day1.part1(Deno.readTextFileSync("./src/day01/input.txt")),
        67658
      );
    });
});

describe("part 2", () => {
  it("should return the correct answer for the example", () => {
    const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

    assertEquals(day1.part2(input), 45000);
  }),
    it("should return the correct answer for the input", () => {
      assertEquals(
        day1.part2(Deno.readTextFileSync("./src/day01/input.txt")),
        200158
      );
    });
});
