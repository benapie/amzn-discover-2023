import { generateRandomName } from "./names";

const ATTACK_AMOUNT = 100;
const HEAL_AMOUNT = 100;
const MAX_HEALTH = 1000;

export class Character {
  private _health: number;
  private _level: number;
  private _alive: boolean;
  private _name: string;

  public get health() {
    return this._health;
  }

  public get level() {
    return this._level;
  }

  public get alive() {
    return this._alive;
  }

  public get name() {
    return this._name;
  }

  constructor() {
    this._health = 1000;
    this._level = 1;
    this._alive = true;
    this._name = generateRandomName();
  }

  attack(options: { character: Character }) {
    const { character } = options;
    character.onAttack({ attackedBy: this });
  }

  heal() {
    const newHealth = this._health + HEAL_AMOUNT;
    if (newHealth > MAX_HEALTH) {
      this._health = MAX_HEALTH;
    } else {
      this._health = newHealth;
    }
  }

  onAttack(options: { attackedBy: Character }) {
    const { attackedBy } = options;

    if (attackedBy === this) {
      console.error(`Character ${this.name} cannot attack itself`);
      return;
    }

    console.log(
      `Character ${this.name} attacked by character '${attackedBy.name}`
    );
    const newHealth = this._health - ATTACK_AMOUNT;
    if (newHealth <= 0) {
      this._health = 0;
      console.log(`Character ${this.name} died`);
      this._alive = false;
    } else {
      this._health = newHealth;
    }
  }
}
