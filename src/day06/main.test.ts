import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.161.0/testing/bdd.ts";
import { Day6, findPacketStart, MARKER_SIZE, MESSAGE_SIZE } from "./main.ts";

const day6 = new Day6();

describe("part 1", () => {
  describe("marker start position", () => {
    it("should find the marker start position at 7", () => {
      assertEquals(
        findPacketStart("mjqjpqmgbljsphdztnvjfqwrcgsmlb", MARKER_SIZE),
        7,
      );
    });

    it("should find the marker start position at 5", () => {
      assertEquals(
        findPacketStart("bvwbjplbgvbhsrlpgdmjqwftvncz", MARKER_SIZE),
        5,
      );
    });

    it("should find the marker start position at 6", () => {
      assertEquals(
        findPacketStart("nppdvjthqldpwncqszvftbrmjlhg", MARKER_SIZE),
        6,
      );
    });

    it("should find the marker start position at 10", () => {
      assertEquals(
        findPacketStart("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", MARKER_SIZE),
        10,
      );
    });

    it("should find the marker start position at 11", () => {
      assertEquals(
        findPacketStart("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", MARKER_SIZE),
        11,
      );
    });
  });

  it("should return the correct answer for the input", () => {
    const input = Deno.readTextFileSync("./src/day06/input.txt");

    assertEquals(day6.part1(input), 1582);
  });
});

describe("part 2", () => {
  describe("message start position", () => {
    it("should find the message start position at 19", () => {
      assertEquals(
        findPacketStart("mjqjpqmgbljsphdztnvjfqwrcgsmlb", MESSAGE_SIZE),
        19,
      );
    });

    it("should find the message start position at 23", () => {
      assertEquals(
        findPacketStart("bvwbjplbgvbhsrlpgdmjqwftvncz", MESSAGE_SIZE),
        23,
      );
    });

    it("should find the message start position at 23", () => {
      assertEquals(
        findPacketStart("nppdvjthqldpwncqszvftbrmjlhg", MESSAGE_SIZE),
        23,
      );
    });

    it("should find the message start position at 29", () => {
      assertEquals(
        findPacketStart("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", MESSAGE_SIZE),
        29,
      );
    });

    it("should find the message start position at 26", () => {
      assertEquals(
        findPacketStart("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", MESSAGE_SIZE),
        26,
      );
    });
  });

  it("should return the correct answer for the input", () => {
    const input = Deno.readTextFileSync("./src/day06/input.txt");

    assertEquals(day6.part2(input), 3588);
  });
});
