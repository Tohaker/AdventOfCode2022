import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.161.0/testing/bdd.ts";
import { Day11, parseMonkey, runRound } from "./main.ts";

const day11 = new Day11();

describe("part 1", () => {
  describe("single round", () => {
    it("should parse the first monkey", () => {
      const input = `Monkey 0:
        Starting items: 79, 98
        Operation: new = old * 19
        Test: divisible by 23
            If true: throw to monkey 2
            If false: throw to monkey 3`;

      const monkey = parseMonkey(input);

      assertEquals(monkey.items, [79, 98]);
      assertEquals(monkey.operation(1), 19);
      assertEquals(monkey.test(22), 3);
      assertEquals(monkey.test(23), 2);
    });

    it("should parse the second monkey", () => {
      const input = `Monkey 1:
      Starting items: 54, 65, 75, 74
      Operation: new = old + 6
      Test: divisible by 19
        If true: throw to monkey 2
        If false: throw to monkey 0`;

      const monkey = parseMonkey(input);

      assertEquals(monkey.items, [54, 65, 75, 74]);
      assertEquals(monkey.operation(1), 7);
      assertEquals(monkey.test(18), 0);
      assertEquals(monkey.test(19), 2);
    });

    it("should parse the third monkey", () => {
      const input = `Monkey 2:
        Starting items: 79, 60, 97
        Operation: new = old * old
        Test: divisible by 13
          If true: throw to monkey 1
          If false: throw to monkey 3`;

      const monkey = parseMonkey(input);

      assertEquals(monkey.items, [79, 60, 97]);
      assertEquals(monkey.operation(5), 25);
      assertEquals(monkey.test(21), 3);
      assertEquals(monkey.test(26), 1);
    });

    it("should parse the fourth monkey", () => {
      const input = `Monkey 3:
        Starting items: 74
        Operation: new = old + 3
        Test: divisible by 17
          If true: throw to monkey 0
          If false: throw to monkey 1`;

      const monkey = parseMonkey(input);

      assertEquals(monkey.items, [74]);
      assertEquals(monkey.operation(5), 8);
      assertEquals(monkey.test(18), 1);
      assertEquals(monkey.test(17), 0);
    });

    it("should run through a single round", () => {
      const input = `Monkey 0:
        Starting items: 79, 98
        Operation: new = old * 19
        Test: divisible by 23
          If true: throw to monkey 2
          If false: throw to monkey 3
      
      Monkey 1:
        Starting items: 54, 65, 75, 74
        Operation: new = old + 6
        Test: divisible by 19
          If true: throw to monkey 2
          If false: throw to monkey 0
      
      Monkey 2:
        Starting items: 79, 60, 97
        Operation: new = old * old
        Test: divisible by 13
          If true: throw to monkey 1
          If false: throw to monkey 3
      
      Monkey 3:
        Starting items: 74
        Operation: new = old + 3
        Test: divisible by 17
          If true: throw to monkey 0
          If false: throw to monkey 1`;

      const monkeys = input
        .split(/\n\s*\n/)
        .map((details) => parseMonkey(details));

      const divisors = monkeys
        .map(({ testValue }) => testValue)
        .reduce((acc, curr) => acc * curr);

      assertEquals(runRound(monkeys, divisors), [
        { items: [20, 23, 27, 26], inspectionCount: 2 },
        { items: [2080, 25, 167, 207, 401, 1046], inspectionCount: 4 },
        { items: [], inspectionCount: 3 },
        { items: [], inspectionCount: 5 },
      ]);
    });
  });

  it("should return the correct result for the example", () => {
    const input = `Monkey 0:
        Starting items: 79, 98
        Operation: new = old * 19
        Test: divisible by 23
          If true: throw to monkey 2
          If false: throw to monkey 3
      
      Monkey 1:
        Starting items: 54, 65, 75, 74
        Operation: new = old + 6
        Test: divisible by 19
          If true: throw to monkey 2
          If false: throw to monkey 0
      
      Monkey 2:
        Starting items: 79, 60, 97
        Operation: new = old * old
        Test: divisible by 13
          If true: throw to monkey 1
          If false: throw to monkey 3
      
      Monkey 3:
        Starting items: 74
        Operation: new = old + 3
        Test: divisible by 17
          If true: throw to monkey 0
          If false: throw to monkey 1`;

    assertEquals(day11.part1(input), 10605);
  });

  it("should return the correct result for the input", () => {
    const input = Deno.readTextFileSync("./src/day11/input.txt");
    assertEquals(day11.part1(input), 119715);
  });
});

describe("part 2", () => {
  it("should return the correct result for the example", () => {
    const input = `Monkey 0:
          Starting items: 79, 98
          Operation: new = old * 19
          Test: divisible by 23
            If true: throw to monkey 2
            If false: throw to monkey 3
        
        Monkey 1:
          Starting items: 54, 65, 75, 74
          Operation: new = old + 6
          Test: divisible by 19
            If true: throw to monkey 2
            If false: throw to monkey 0
        
        Monkey 2:
          Starting items: 79, 60, 97
          Operation: new = old * old
          Test: divisible by 13
            If true: throw to monkey 1
            If false: throw to monkey 3
        
        Monkey 3:
          Starting items: 74
          Operation: new = old + 3
          Test: divisible by 17
            If true: throw to monkey 0
            If false: throw to monkey 1`;

    assertEquals(day11.part2(input), 2713310158);
  });

  it("should return the correct result for the input", () => {
    const input = Deno.readTextFileSync("./src/day11/input.txt");
    assertEquals(day11.part2(input), 18085004878);
  });
});
