import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";
import {
  afterAll,
  describe,
  it,
} from "https://deno.land/std@0.161.0/testing/bdd.ts";
import { Day7 } from "./main.ts";

const day7 = new Day7();

describe("part 1", () => {
  afterAll(() => {
    try {
      Deno.removeSync("./src/day07/output", { recursive: true });
    } catch (error) {
      console.warn(error);
    }
  });

  it("should return the correct answer for the example", () => {
    const input = `$ cd /
    $ ls
    dir a
    14848514 b.txt
    8504156 c.dat
    dir d
    $ cd a
    $ ls
    dir e
    29116 f
    2557 g
    62596 h.lst
    $ cd e
    $ ls
    584 i
    $ cd ..
    $ cd ..
    $ cd d
    $ ls
    4060174 j
    8033020 d.log
    5626152 d.ext
    7214296 k`;

    assertEquals(day7.part1(input), 95437);
  });

  it("should return the correct answer for the input", () => {
    const input = Deno.readTextFileSync("./src/day07/input.txt");

    assertEquals(day7.part1(input), 1444896);
  });
});
