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

  it("should not be able attack themselves", () => {
    const character = new Character();
    const health = character.health;

    expect(() => character.attack({ character })).toThrow();
  });

  it("should not be alive when attacked until health is zero", () => {
    const characterA = new Character();
    const characterB = new Character();

    while (characterA.health > 0) {
      characterB.attack({ character: characterA });
      console.log(characterA.health);
    }

    expect(characterA.alive).toBe(false);
  });

  it("should decrement stamina by 10 when attacked", () => {
    const characterA = new Character();
    const characterB = new Character();

    expect(characterA.stamina).toEqual(100);

    characterA.attack({ character: characterB });

    expect(characterA.stamina).toEqual(90);
  });

  it("should increment stamina by 5 every tick", () => {
    const characterA = new Character();
    const characterB = new Character();

    expect(characterA.stamina).toEqual(100);

    characterA.attack({ character: characterB });

    expect(characterA.stamina).toEqual(90);

    characterA.tick();

    expect(characterA.stamina).toEqual(95);
  });
});
