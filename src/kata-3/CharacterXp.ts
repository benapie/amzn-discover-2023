const computeLevelXpThreshold = (level: number) => {
  return level ** 2 * 10;
};

export class CharacterXp {
  private _level: number;
  private _xp: number;
  private _onLevelUp: () => void;
  private _effect: XpEffect | null;

  constructor(options: { onLevelUp: () => void }) {
    this._level = 1;
    this._xp = 0;
    this._onLevelUp = options.onLevelUp;
  }

  get xp() {
    return this._xp;
  }

  get level() {
    return this._level;
  }

  addXp(xp: number) {
    const xpTransform = this._effect
      ? xpEffectToTransform[this._effect]
      : (xp: number) => xp;
    this._xp += xpTransform(xp);

    const xpThreshold = computeLevelXpThreshold(this._level);

    if (this._xp >= xpThreshold) {
      this._xp = 0;
      this._level += 1;
      this._onLevelUp();
    }
  }

  setEffect(effect: XpEffect) {
    this._effect = effect;
  }

  clearEffect() {
    this._effect = null;
  }
}

type XpEffect = "double-xp" | "half-xp";

const xpEffectToTransform: Record<XpEffect, (xp: number) => number> = {
  "double-xp": (xp) => xp * 2,
  "half-xp": (xp) => xp * 0.5,
};
