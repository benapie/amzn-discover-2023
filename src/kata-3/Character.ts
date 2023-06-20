import { CharacterXp } from "./CharacterXp";
import { generateRandomName } from "./names";

const ATTACK_AMOUNT = 100;
const HEAL_AMOUNT = 100;
const MAX_HEALTH = 1000;
const KILL_XP = 50;

const GET_LEVEL = (xp: number) => Math.sqrt(xp / 10);

export class Character {
  private _health: number;
  private _alive: boolean;
  private _name: string;
  private _characterXp: CharacterXp;

  public get health() {
    return this._health;
  }

  public get alive() {
    return this._alive;
  }

  public get name() {
    return this._name;
  }

  public get xp() {
    return this._characterXp.xp;
  }

  public get level() {
    return this._characterXp.level;
  }

  constructor() {
    this._health = 1000;
    this._alive = true;
    this._name = generateRandomName();
    this._characterXp = new CharacterXp({
      onLevelUp: () => console.log(`${this._name} leveled up!`),
    });
  }

  attack(options: { character: Character }) {
    const { character } = options;
    const { killed } = character.onAttack({ attackedBy: this });
    if (killed) {
      this._characterXp.addXp(KILL_XP);
    }
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
      throw new Error(`Character ${this.name} cannot attack itself`);
    }

    console.log(
      `Character ${this.name} attacked by character '${attackedBy.name}`
    );
    const newHealth = this._health - ATTACK_AMOUNT;
    if (newHealth <= 0) {
      this._health = 0;
      console.log(`Character ${this.name} died`);
      this._alive = false;
      return { killed: true };
    }

    this._health = newHealth;
    return { killed: false };
  }
}
