const computeLevelXpThreshold = (level: number) => {
  return level ** 2 * 10;
};

/**
 * this is a bit of an abstract class, so adding some comments
 * here of _why_ it exists is good.
 * (focus on why something exists instead of what exists,
 * code should be self documenting so the "what" should be
 * redundant).
 */
export class CharacterXp {
  private _level: number;
  private _xp: number;
  private _buff: boolean;
  constructor() {
    this._level = 1;
    this._xp = 0;
  }

  get xp() {
    return this._xp;
  }

  get level() {
    return this._level;
  }

  // Adds xps to a character
  addXp(xp: number) {
    if (this._buff) {
      this._xp += 2 * xp;
    } else {
      this._xp += xp;
    }

    const xpThreshold = computeLevelXpThreshold(this._level);

    if (this._xp >= xpThreshold) {
      this._xp = 0;
      this._level += 1;
    }
  }

  addDoubleXpBuff() {
    this._buff = true;
  }
}
