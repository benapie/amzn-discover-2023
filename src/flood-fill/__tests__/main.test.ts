import { floodFill } from "../main";

describe("Solution test", () => {
  describe("correctness", () => {
    it("is correct (simple)", () => {
      const filledImage = floodFill({
        image: [
          [0, 0],
          [0, 1],
        ],
        sr: 0,
        sc: 0,
        newColor: 5,
      });

      expect(filledImage).toEqual([
        [5, 5],
        [5, 1],
      ]);
    });

    it("is correct (medium)", () => {
      const filledImage = floodFill({
        image: [
          [0, 0, 1],
          [0, 1, 0],
          [1, 0, 0],
        ],
        sr: 0,
        sc: 0,
        newColor: 5,
      });

      expect(filledImage).toEqual([
        [5, 5, 1],
        [5, 1, 0],
        [1, 0, 0],
      ]);
    });

    it("is correct complex", () => {
      const filledImage = floodFill({
        image: [
          [0, 1, 0, 0, 0],
          [0, 1, 0, 1, 0],
          [0, 1, 0, 1, 0],
          [0, 1, 0, 1, 0],
          [0, 0, 0, 1, 0],
        ],
        sr: 0,
        sc: 0,
        newColor: 5,
      });

      expect(filledImage).toEqual([
        [5, 1, 5, 5, 5],
        [5, 1, 5, 1, 5],
        [5, 1, 5, 1, 5],
        [5, 1, 5, 1, 5],
        [5, 5, 5, 1, 5],
      ]);
    });
  });

  describe("input validation", () => {
    it("can handle newColor === oldColor", () => {
      const filledImage = floodFill({
        image: [
          [0, 0],
          [0, 1],
        ],
        sr: 0,
        sc: 0,
        newColor: 0,
      });

      expect(filledImage).toEqual([
        [0, 0],
        [0, 1],
      ]);
    });

    it("can handle empty image", () => {
      const filledImage = floodFill({
        image: [[], []],
        sr: 0,
        sc: 0,
        newColor: 0,
      });

      expect(filledImage).toEqual([[], []]);
    });

    it("can handle out of bounds start index", () => {
      const filledImage = floodFill({
        image: [[0], [0]],
        sr: 4,
        sc: 4,
        newColor: 0,
      });

      expect(filledImage).toEqual([[0], [0]]);
    });

    it("can handle non rectangular image", () => {
      const filledImage = floodFill({
        image: [[0, 0, 0, 0], [0, 0, 0, 0], [], [0, 0, 0, 0]],
        sr: 0,
        sc: 0,
        newColor: 0,
      });

      expect(filledImage).toEqual([[0], [0]]);
    });
  });
});
