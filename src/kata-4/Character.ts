import { CharacterXp } from "./CharacterXp";
import { generateRandomName } from "./names";
import { Playable } from "./Playable";

// we write these as constants at the top
// to avoid repetition but mainly to
// make things easier to read + easier to change
const ATTACK_AMOUNT = 100;
const HEAL_AMOUNT = 100;
const MAX_HEALTH = 1000;
const MAX_STAMINA = 100;
const STAMINA_PER_TICK = 5;
const STAMINA_CONSUMED_BY_ATTACK = 10;
const KILL_XP = 50;

export class Character implements Playable {
  private _health: number;
  private _alive: boolean;
  private _name: string;
  // Separation of concerns, logic about "levelling-up" based on xp
  // can be removed from this class and stored in `CharacterXp`,
  // which can be tested independently and reused if needed.
  // For reuse, we could have specific "skills" that we can level up separately.
  // E.g., chopping a tree adds XP to your `Woodcutting` skill
  private _characterXp: CharacterXp;
  private _stamina: number;

  public get health() {
    return this._health;
  }

  public get alive() {
    return this._alive;
  }

  public get name() {
    return this._name;
  }

  // even though we've abstracted out xp and level to `CharacterXp`,
  // consumers of this class don't see that. We've abstracted away all
  // of that logic and haven't changed the public interface!
  public get xp() {
    return this._characterXp.xp;
  }

  public get level() {
    return this._characterXp.level;
  }

  public get stamina() {
    return this._stamina;
  }

  // this method was added as there is likely more things that need
  // to "tick" during the game, e.g.: mana regeneration, buffs, etc.
  public tick() {
    const newStamina = this._stamina + STAMINA_PER_TICK;
    if (newStamina > MAX_STAMINA) {
      this._stamina = MAX_STAMINA;
    } else {
      this._stamina = newStamina;
    }
  }

  constructor() {
    this._health = 1000;
    this._alive = true;
    this._name = generateRandomName();
    this._characterXp = new CharacterXp();
    this._stamina = 100;
  }

  attack(options: { character: Character }) {
    const { character } = options;
    // we pass whether a character has been killed back to the character
    // this allows us to change what happens when a character is killed
    // (maybe you have a quest to kill 3 characters?)
    const { killed } = character.onAttack({ attackedBy: this });

    const canAttack = this._stamina >= 10;
    if (!canAttack) {
      console.warn(
        `Character ${this.name} tried to attack ${this.name}, but has too little stamina (${this._stamina})`
      );
    }

    if (killed) {
      this._characterXp.addXp(KILL_XP);
    }
    this._stamina -= STAMINA_CONSUMED_BY_ATTACK;
  }

  heal() {
    const newHealth = this._health + HEAL_AMOUNT;
    if (newHealth > MAX_HEALTH) {
      this._health = MAX_HEALTH;
    } else {
      this._health = newHealth;
    }
  }

  // I did not implement weapons, but we could pass a weapon into this
  // function. This can help manage complexity of different classes
  // having different protection levels against certain weapons.
  // E.g. trolls having 50% protection against blunt damage.
  onAttack(options: { attackedBy: Character }) {
    const { attackedBy } = options;

    if (attackedBy === this) {
      // maybe this should not throw, but handle gracefully..
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
