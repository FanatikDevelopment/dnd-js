import { abilityCheck, abilityModifier } from './utils';
import { d20 } from '../utils';

describe('abilityModifier', () => {
  it('should return the modifier corresponding to the ability score', () => {
    expect(abilityModifier(0)).toBe(-5);
    expect(abilityModifier(10)).toBe(0);
    expect(abilityModifier(20)).toBe(5);
    expect(abilityModifier(30)).toBe(10);
    const compute = (val: number) => Math.floor((val - 10) / 2);
    for (let i = 0; i < 30; ++i) {
      expect(abilityModifier(i)).toBe(compute(i));
    }
  });
});

describe('abilityChecker', () => {
  const realRoll = d20.roll;
  let i = 0;
  beforeAll(() => {
    d20.roll = jest.fn(() => {
      const result = (i % 20) + 1;
      ++i;
      return {
        dice: d20,
        diceValues: [result],
        total: result,
      };
    });
  });

  afterAll(() => {
    d20.roll = realRoll;
  });
  it('should return the result of the roll of 1d20 + Ability modifier', () => {
    expect(abilityCheck(0)).toBe(-4);
    expect(abilityCheck(10)).toBe(2);
    expect(abilityCheck(20, d20)).toBe(8);
    expect(abilityCheck(30, d20)).toBe(14);
    const compute = (val: number) =>
      ((i - 1) % 20) + 1 + Math.floor((val - 10) / 2);
    for (let i = 0; i < 30; ++i) {
      expect(abilityCheck(i)).toBe(compute(i));
    }
  });
});
