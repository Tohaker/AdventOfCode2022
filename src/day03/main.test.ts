import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.161.0/testing/bdd.ts";
import { Day3, findCommonItem, findDuplicateItem } from "./main.ts";

const day3 = new Day3();

describe("part 1", () => {
  describe("check for duplicate item", () => {
    it("should return priority 16", () => {
      const rucksack = "vJrwpWtwJgWrhcsFMMfFFhFp";

      assertEquals(findDuplicateItem(rucksack), 16);
    });

    it("should return priority 38", () => {
      const rucksack = "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL";

      assertEquals(findDuplicateItem(rucksack), 38);
    });

    it("should return priority 42", () => {
      const rucksack = "PmmdzqPrVvPwwTWBwg";

      assertEquals(findDuplicateItem(rucksack), 42);
    });

    it("should return priority 22", () => {
      const rucksack = "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn";

      assertEquals(findDuplicateItem(rucksack), 22);
    });

    it("should return priority 20", () => {
      const rucksack = "ttgJtRGJQctTZtZT";

      assertEquals(findDuplicateItem(rucksack), 20);
    });

    it("should return priority 19", () => {
      const rucksack = "CrZsJsPPZsGzwwsLwLmpwMDw";

      assertEquals(findDuplicateItem(rucksack), 19);
    });
  });

  it("should return the correct value for the example", () => {
    const input = `vJrwpWtwJgWrhcsFMMfFFhFp
    jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
    PmmdzqPrVvPwwTWBwg
    wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
    ttgJtRGJQctTZtZT
    CrZsJsPPZsGzwwsLwLmpwMDw`;

    assertEquals(day3.part1(input), 157);
  });

  it("should return the correct value for the input", () => {
    const input = Deno.readTextFileSync("./src/day03/input.txt");

    assertEquals(day3.part1(input), 7817);
  });
});

describe("part 2", () => {
  describe("find common item", () => {
    it("should return priority 18", () => {
      const rucksacks = [
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg",
      ];

      assertEquals(findCommonItem(rucksacks), 18);
    });

    it("should return priority 52", () => {
      const rucksacks = [
        "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
        "ttgJtRGJQctTZtZT",
        "CrZsJsPPZsGzwwsLwLmpwMDw",
      ];

      assertEquals(findCommonItem(rucksacks), 52);
    });
  });

  it("should return the correct value for the example", () => {
    const input = `vJrwpWtwJgWrhcsFMMfFFhFp
    jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
    PmmdzqPrVvPwwTWBwg
    wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
    ttgJtRGJQctTZtZT
    CrZsJsPPZsGzwwsLwLmpwMDw`;

    assertEquals(day3.part2(input), 70);
  });

  it("should return the correct value for the input", () => {
    const input = Deno.readTextFileSync("./src/day03/input.txt");

    assertEquals(day3.part2(input), 2444);
  });
});
