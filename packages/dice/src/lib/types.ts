/**
 * An interface representing the information necessary to create a Dice
 */
export interface DiceProps {
  /** The number of faces of the Dice */
  sides: number;

  /** The number of dice */
  count: number;

  /** The bonus to apply to the dice roll results */
  bonus: number;
}

/**
 * An interface representing the result of a dice roll
 */
export type DiceRoll = {
  /** The result of the dice roll */
  total: number;

  /** The result of the roll for each dice without applying the bonus */
  diceValues: number[];

  /** The Dice rolled */
  dice: DiceProps;
};

/**
 * An interface representing the API of a Dice
 */
export interface Dice extends DiceProps {
  /** The pattern representing the dice */
  readonly pattern: string;

  readonly props: DiceProps;

  /** The number of faces of the Dice */
  sides: number;

  /** The number of dice */
  count: number;

  /** The modifier to apply to the dice roll results */
  bonus: number;

  /**
   * Get the minimum value possible for this Dice.
   * @return The minimum value possible for this Dice.
   */
  readonly min: number;

  /**
   * Get the maximum value possible for this Dice.
   */
  readonly max: number;

  /**
   * Get the number of possible combinations for this Dice.
   */
  readonly cardinal: number;

  /**
   * Get the number of possible values for this Dice.
   */
  readonly valuesCardinal: number;

  roll(): DiceRoll;

  generator: () => Generator<DiceRoll, never, never>;
}
