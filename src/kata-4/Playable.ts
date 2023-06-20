// This was added to allow more classes to be added
// that are able to be played.
// Instead of inheritance, we could use this "functionality-based"
// approach.
// We can add more, such as `Damagable` if needed.
export interface Playable {
  /**
   * Ticks the game along, e.g., adds stamina to character
   */
  tick: () => void;
}
