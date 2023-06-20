export class Character {
  private _health: number;
  private _level: number;
  private _alive: boolean;

  public get health() {
    return this._health;
  }

  public get level() {
    return this._level;
  }

  public get alive() {
    return this._alive;
  }

  constructor() {
    this._health = 1000;
    this._level = 1;
    this._alive = true;
  }
}
