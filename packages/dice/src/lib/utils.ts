import { DiceProps, DiceRoll } from './types';

import { Chance } from 'chance';

/**
 * The Random Generator used to roll the dices.
 * @description This generator internally use chance to produce
 * number, you can give it a seed to have a predictable sequence using
 * the **DNDJS_DICE_RANDOM_SEED** environment variable (pass any string
 * of your choice).
 *
 */
export const DiceRg = new Chance(
  // Chance is a bit tricky, if you pass undefined it treats it as a value
  ...(process.env['DNDJS_DICE_RANDOM_SEED']
    ? [process.env['DNDJS_DICE_RANDOM_SEED']]
    : [])
);

/**
 * The regex used to parse dice patterns
 */
export const DiceRegex = /^([1-9]\d*)d([1-9]\d*)(?:([+-])([1-9]\d*))?$/i;

/**
 * Get a string representing the modifier
 * @param {DiceProps} d The dice to use
 * @returns {string} A string representing the modifier.
 */
export function diceBonusSerialize(d: DiceProps): string {
  if (d.bonus > 0) {
    return `+${d.bonus}`;
  }

  if (d.bonus < 0) {
    return `${d.bonus}`;
  }

  return '';
}

/**
 * Get the dice as a string (i.e the pattern representing the dice).
 * @param {DiceProps} d The dice to use.
 * @returns The dice as a string (i.e the pattern representing the dice).
 */
export function diceSerialize(d: DiceProps): string {
  return `${d.count}d${d.sides}${diceBonusSerialize(d)}`;
}

/**
 * Parse a pattern to hydrate the DiceProps.
 * @param  {string} pattern The pattern to parse.
 * @returns {DiceProps} The options describe by the pattern
 */
export function diceParse(pattern: string): DiceProps {
  const diceInfo = pattern.match(DiceRegex);
  if (diceInfo === null) {
    throw new Error(
      `'${pattern}' does not match the dice string format 'xdy[(+|-)w]' (examples: '1d6', '2d8+4', '1d20-2')`
    );
  }

  const count = Number.parseInt(diceInfo[1], 10);
  const size = Number.parseInt(diceInfo[2], 10);

  let modifier = 0;
  if (diceInfo[3] && diceInfo[4]) {
    modifier =
      Number.parseInt(diceInfo[4], 10) * (diceInfo[3] === '+' ? 1 : -1);
  }

  return { count, sides: size, bonus: modifier };
}

/**
 * Get the minimum value possible for the given dice.
 * @param {DiceProps} d The dice to use.
 * @return The minimum value possible for the given dice.
 */
export function diceMin(d: DiceProps) {
  return d.count + d.bonus;
}

/**
 * Get the maximum value possible for the given dice.
 * @param {DiceProps} d The dice to use.
 * @return The maximum value possible for the given dice.
 */
export function diceMax(d: DiceProps): number {
  return d.count * d.sides + d.bonus;
}

/**
 * Get the number of possible combinations for the given dice.
 * @param {DiceProps} d The dice to use.
 * @return The number of possible combinations for the given dice.
 */
export function diceCardinal(d: DiceProps): number {
  return d.sides ** d.count;
}

/**
 * Get the number of possible values for the given dice.
 * @param {DiceProps} d The dice to use.
 * @return The number of possible values for the given dice.
 */
export function diceValuesCardinal(d: DiceProps): number {
  return diceMax(d) - diceMin(d) + 1;
}

/**
 * Roll the dice and return a DiceRoll object representing the result.
 * The DiceRoll object contains:
 * ```
 * {
 *   total: number; //random number in range [this.min, this.max],
 *   diceValues: number[]; // an array containing the roll value for each dice,
 *   dice: DiceProps; // the dice rolled
 * }
 * ```
 * @param {DiceProps} d The dice to roll.
 * @returns {DiceRoll} The result of the dice roll.
 */
export function diceRoll(d: DiceProps, generator?: Chance.Chance): DiceRoll {
  const result = {
    total: d.bonus,
    diceValues: [] as number[],
    dice: d,
  };

  const g = generator ?? DiceRg;
  for (let i = 0; i < d.count; ++i) {
    const current = g.integer({ min: 1, max: d.sides });
    result.total += current;
    result.diceValues.push(current);
  }

  return result;
}

/**
 * Get an infinite iterable generator that roll the dice on each iteration.
 * @param {DiceProps} d The dice to roll.
 * @returns {Generator<DiceRoll, never, never>} A generator that roll the dice on each iteration.
 * The generator never ends and does not take any arguments.
 */
export function* diceRollGenerator(
  d: DiceProps,
  generator?: Chance.Chance
): Generator<DiceRoll, never, never> {
  while (true) {
    yield diceRoll(d, generator);
  }
}
