import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.161.0/testing/bdd.ts";
import { Day9, Direction, getTailPosition } from "./main.ts";

const day9 = new Day9();

describe("part 1", () => {
  describe("movement of head", () => {
    it("should not move the tail when the head overlaps it", () => {
      assertEquals(
        getTailPosition({
          direction: Direction.RIGHT,
          head: { x: 0, y: 0 },
          tail: { x: 0, y: 0 },
        }),
        { x: 0, y: 0 }
      );
    });

    describe("head moves in line with the tail", () => {
      it("should move the tail right when the head moves right", () => {
        assertEquals(
          getTailPosition({
            direction: Direction.RIGHT,
            head: { x: 1, y: 0 },
            tail: { x: 0, y: 0 },
          }),
          { x: 1, y: 0 }
        );
      });

      it("should move the tail left when the head moves left", () => {
        assertEquals(
          getTailPosition({
            direction: Direction.LEFT,
            head: { x: 1, y: 0 },
            tail: { x: 2, y: 0 },
          }),
          { x: 1, y: 0 }
        );
      });

      it("should move the tail up when the head moves up", () => {
        assertEquals(
          getTailPosition({
            direction: Direction.UP,
            head: { x: 0, y: 1 },
            tail: { x: 0, y: 0 },
          }),
          { x: 0, y: 1 }
        );
      });

      it("should move the tail down when the head moves down", () => {
        assertEquals(
          getTailPosition({
            direction: Direction.DOWN,
            head: { x: 0, y: 1 },
            tail: { x: 0, y: 2 },
          }),
          { x: 0, y: 1 }
        );
      });
    });

    describe("head moves diagonal to the tail", () => {
      it("should not move the tail when the head moves up", () => {
        assertEquals(
          getTailPosition({
            direction: Direction.UP,
            head: { x: 1, y: 0 },
            tail: { x: 0, y: 0 },
          }),
          { x: 0, y: 0 }
        );
      });

      it("should not move the tail when the head moves down", () => {
        assertEquals(
          getTailPosition({
            direction: Direction.DOWN,
            head: { x: 1, y: 1 },
            tail: { x: 0, y: 1 },
          }),
          { x: 0, y: 1 }
        );
      });

      it("should not move the tail when the head moves left", () => {
        assertEquals(
          getTailPosition({
            direction: Direction.LEFT,
            head: { x: 1, y: 1 },
            tail: { x: 1, y: 0 },
          }),
          { x: 1, y: 0 }
        );
      });

      it("should not move the tail when the head moves right", () => {
        assertEquals(
          getTailPosition({
            direction: Direction.RIGHT,
            head: { x: 1, y: 0 },
            tail: { x: 1, y: 1 },
          }),
          { x: 1, y: 1 }
        );
      });
    });

    describe("head is diagonal to the tail and moves", () => {
      it("should move the tail diagonally up and right", () => {
        assertEquals(
          getTailPosition({
            direction: Direction.UP,
            head: { x: 1, y: 1 },
            tail: { x: 0, y: 0 },
          }),
          { x: 1, y: 1 }
        );
      });

      it("should move the tail diagonally up and left", () => {
        assertEquals(
          getTailPosition({
            direction: Direction.LEFT,
            head: { x: 0, y: 1 },
            tail: { x: 1, y: 0 },
          }),
          { x: 0, y: 1 }
        );
      });

      it("should move the tail diagonally down and right", () => {
        assertEquals(
          getTailPosition({
            direction: Direction.RIGHT,
            head: { x: 1, y: 0 },
            tail: { x: 0, y: 1 },
          }),
          { x: 1, y: 0 }
        );
      });
    });

    it("should return the correct result for the example", () => {
      const input = `R 4
        U 4
        L 3
        D 1
        R 4
        D 1
        L 5
        R 2`;

      assertEquals(day9.part1(input), 13);
    });
  });
});
