import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.161.0/testing/bdd.ts";
import { parseFileTree } from "./main.ts";

describe("part 1", () => {
  describe("parse file tree", () => {
    it("should return an empty object for a single cd command", () => {
      assertEquals(parseFileTree(["$ cd /"]), { "/": {} });
    });

    it("should read the contents of a single directory", () => {
      const input = `$ cd /
        $ ls
        dir a
        14848514 b.txt
        8504156 c.dat
        dir d`
        .split("\n")
        .map((l) => l.trim());

      assertEquals(parseFileTree(input), {
        "/": { a: {}, "b.txt": 14848514, "c.dat": 8504156, d: {} },
      });
    });

    it("should read the contents of one level nested directories", () => {
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
        62596 h.lst`
        .split("\n")
        .map((l) => l.trim());

      assertEquals(parseFileTree(input), {
        "/": {
          a: { e: {}, f: 29116, g: 2557, "h.lst": 62596 },
          "b.txt": 14848514,
          "c.dat": 8504156,
          d: {},
        },
      });
    });

    it("should read the contents of multi level nested directories", () => {
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
        584 i`
        .split("\n")
        .map((l) => l.trim());

      assertEquals(parseFileTree(input), {
        "/": {
          a: { e: { i: 584 }, f: 29116, g: 2557, "h.lst": 62596 },
          "b.txt": 14848514,
          "c.dat": 8504156,
          d: {},
        },
      });
    });

    Deno.test("should read the contents of directories in upper levels", () => {
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
      7214296 k`
        .split("\n")
        .map((l) => l.trim());

      assertEquals(parseFileTree(input), {
        "/": {
          a: { e: { i: 584 }, f: 29116, g: 2557, "h.lst": 62596 },
          "b.txt": 14848514,
          "c.dat": 8504156,
          d: { j: 4060174, "d.log": 8033020, "d.ext": 5626152, k: 7214296 },
        },
      });
    });
  });
});

Deno.test("should read the contents of directories in upper levels", () => {
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
  7214296 k`
    .split("\n")
    .map((l) => l.trim());

  assertEquals(parseFileTree(input), {
    "/": {
      a: { e: { i: 584 }, f: 29116, g: 2557, "h.lst": 62596 },
      "b.txt": 14848514,
      "c.dat": 8504156,
      d: { j: 4060174, "d.log": 8033020, "d.ext": 5626152, k: 7214296 },
    },
  });
});
