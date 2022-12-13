import {
  assert,
  assertEquals,
  assertFalse,
} from "https://deno.land/std@0.161.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.161.0/testing/bdd.ts";
import { Day13, inRightOrder } from "./main.ts";

const day13 = new Day13();

describe("part 1", () => {
  describe("determine pair is in order", () => {
    it("should find when they are in the right order", () => {
      assert(inRightOrder("[1,1,3,1,1]", "[1,1,5,1,1]"));
      assert(inRightOrder("[[1],[2,3,4]]", "[[1],4]"));
      assert(inRightOrder("[[4,4],4,4]", "[[4,4],4,4,4]"));
      assert(inRightOrder("[]", "[3]"));

      assert(inRightOrder("[7,7,7]", "[7,7,7,7]"));
      assert(inRightOrder("[]", "[]"));
    });

    it("should find when they are not in the right order", () => {
      assertFalse(inRightOrder("[9]", "[[8,7,6]]"));
      assertFalse(inRightOrder("[7,7,7,7]", "[7,7,7]"));
      assertFalse(inRightOrder("[[[]]]", "[[]]"));
      assertFalse(
        inRightOrder(
          "[1,[2,[3,[4,[5,6,7]]]],8,9]",
          "[1,[2,[3,[4,[5,6,0]]]],8,9]"
        )
      );

      assertFalse(inRightOrder("[[],4]", "[[],3]"));
    });
  });

  it("should return the correct result for the example", () => {
    const input = `[1,1,3,1,1]
    [1,1,5,1,1]
    
    [[1],[2,3,4]]
    [[1],4]
    
    [9]
    [[8,7,6]]
    
    [[4,4],4,4]
    [[4,4],4,4,4]
    
    [7,7,7,7]
    [7,7,7]
    
    []
    [3]
    
    [[[]]]
    [[]]
    
    [1,[2,[3,[4,[5,6,7]]]],8,9]
    [1,[2,[3,[4,[5,6,0]]]],8,9]`;

    assertEquals(day13.part1(input), 13);
  });
});
