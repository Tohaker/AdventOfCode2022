import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.161.0/testing/bdd.ts";

import { sumCalories } from "./main.ts";

describe("calculates total calories", () => {
  it("should calculate total calories for a single line", () => {
    assertEquals(sumCalories([4000]), 4000);
  });

  it("should calculate total calories for multiple lines", () => {
    assertEquals(sumCalories([1000, 2000, 3000]), 6000);
  });
});
