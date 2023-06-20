import { Character } from "../Character";

describe("Character", () => {
  describe("when instantiated", () => {
    it("should have 1000 health when instantiated", () => {
      const character = new Character();

      expect(character.health).toBe(1000);
    });

    it("should have alive when instantiated", () => {
      const character = new Character();

      expect(character.alive).toBe(true);
    });

    it("should have level 1 when instantiated", () => {
      const character = new Character();

      expect(character.level).toBe(1);
    });
  });
});
