import { Dice, DiceProps, DiceRoll } from './types';
import { diceParse, diceRoll, diceSerialize } from './utils';

export default class DiceProxy implements Dice {
  /**
   * The number of faces of the dices.
   * @member {number} [_sides = 2]
   * @private
   */
  private _sides: number;

  /**
   * The number of dices.
   * @member {number} [_count = 1]
   * @private
   */
  private _count: number;

  /**
   * The value applied to the roll total.
   * @member {number} [bonus = 0]
   * @public
   */
  public bonus: number;

  /**
   * Create a Dice given a pattern or options describing the dice.
   * @param {Partial<DiceProps> | string} options either a partial DiceProps object
   * or a string representing a dice pattern.
   * @param {number} [options.sides = 2] the number of faces of the dice if options is a DiceObject.
   * @param {number} [options.count = 1] the number of dice if options is a DiceObject.
   * @param {number} [options.bonus = 0] the bonus of the dice if options is a
   * DiceObject.
   * @throws {Error} if options is a string but does not match the DiceRegex or if options is a
   * DiceProps and sides < 2 or count < 1.
   */
  public constructor(props: Partial<DiceProps> | string) {
    const { sides, count, bonus }: Partial<DiceProps> =
      typeof props === 'string' ? diceParse(props) : props;

    this._sides = 2;
    this._count = 1;
    this.bonus = 0;

    this.sides = sides ?? this._sides;
    this.count = count ?? this._count;
    this.bonus = bonus ?? this.bonus;
  }

  /**
   * Get the pattern that represents the dice.
   * @see diceSerialize it is used internally
   * @return The pattern that represents the dice.
   */
  public get pattern(): string {
    return diceSerialize(this);
  }

  /**
   * Get the properties that represents the dice.
   * @see DiceProps
   * @return The properties that represents the dice.
   */
  public get props(): DiceProps {
    const { sides, count, bonus } = this;
    return { sides, count, bonus };
  }

  /**
   * Get the number of faces of the dice.
   * @return The number of faces of the dice.
   */
  public get sides(): number {
    return this._sides;
  }

  /**
   * Set the number of faces of the dice.
   * @param {number} value the number of face you want to set to the dice
   * @private
   * @throws {Error} if value < 2
   */
  public set sides(value: number) {
    if (value < 2) {
      throw new Error(
        `Dice sides must be greater or equal to 2 (received ${value})`
      );
    }

    this._sides = value;
  }

  /**
   * Get the number of dice.
   * @return The number of dice.
   */
  public get count(): number {
    return this._count;
  }

  /**
   * Set the number of dice.
   * @param {number} value the number you want to set
   * @private
   * @throws {Error} if value < 1
   */
  public set count(value: number) {
    if (value < 1) {
      throw new Error(
        `Dice count must be greater or equal to 1 (received ${value})`
      );
    }

    this._count = value;
  }

  /**
   * Get the minimum value possible for this Dice.
   * @return The minimum value possible for this Dice.
   */
  public get min(): number {
    return this.count + this.bonus;
  }

  /**
   * Get the maximum value possible for this Dice.
   * @return The maximum value possible for this Dice.
   */
  public get max(): number {
    return this.count * this.sides + this.bonus;
  }

  /**
   * Get the number of possible combinations for this Dice.
   * @return The number of possible combinations for this Dice.
   */
  public get cardinal(): number {
    return this.sides ** this.count;
  }

  /**
   * Get the number of possible values for this Dice.
   * @return The number of possible values for this Dice.
   */
  public get valuesCardinal(): number {
    return this.max - this.min + 1;
  }

  /**
   * Get the dice as a string (i.e the pattern representing the dice).
   * This is a convenience function to make logging more readable.
   * @alias DiceProxy.pattern
   * @alias DiceProxy.toJSON
   * @returns The dice as a string (i.e the pattern representing the dice).
   */
  public toString(): string {
    return this.pattern;
  }

  /**
   * Get the dice as a string (i.e the pattern representing the dice).
   * This is a convenience function to make serialization lighter.
   * @alias DiceProxy.pattern
   * @alias DiceProxy.toString
   * @returns The dice as a string (i.e the pattern representing the dice).
   */
  public toJSON(): string {
    return this.pattern;
  }

  /**
   * Roll the dice and return a DiceRoll object representing the result.
   * @see diceRoll as it uses it internally
   * @returns {DiceRoll} The result of the dice roll.
   */
  public roll(): DiceRoll {
    return diceRoll(this);
  }

  /**
   * Get an infinite iterable generator that roll the dice on each iteration.
   * @see DiceProxy.roll as it uses it internally.
   * @see diceRollGenerator as they are equivalent.
   * @returns {Generator<DiceRoll, never, never>} A generator that roll the dice on each iteration.
   * The generator never ends and does not take any arguments.
   */
  public *generator(): Generator<DiceRoll, never, never> {
    while (true) {
      yield this.roll();
    }
  }
}
