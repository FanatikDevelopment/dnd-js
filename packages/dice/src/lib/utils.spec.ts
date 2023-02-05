import { Chance } from 'chance';
import {
  diceCardinal,
  diceMax,
  diceMin,
  diceBonusSerialize,
  diceParse,
  diceRoll,
  diceRollGenerator,
  diceSerialize,
  diceValuesCardinal,
  DiceRg,
} from './utils';

describe('dice min', () => {
  it('should return count + bonus', () => {
    expect(diceMin({ sides: 6, count: 2, bonus: 0 })).toBe(2);
    expect(diceMin({ sides: 12, count: 1, bonus: 0 })).toBe(1);
    expect(diceMin({ sides: 8, count: 3, bonus: 1 })).toBe(4);
    expect(diceMin({ sides: 6, count: 2, bonus: -2 })).toBe(0);
  });
});

describe('dice max', () => {
  it('should return sides * count + bonus', () => {
    expect(diceMax({ sides: 6, count: 2, bonus: 0 })).toBe(12);
    expect(diceMax({ sides: 12, count: 1, bonus: 0 })).toBe(12);
    expect(diceMax({ sides: 8, count: 3, bonus: 1 })).toBe(25);
    expect(diceMax({ sides: 6, count: 2, bonus: -2 })).toBe(10);
  });
});

describe('dice cardinal', () => {
  it('should return sides ** count', () => {
    expect(diceCardinal({ sides: 6, count: 2, bonus: 0 })).toBe(36);
    expect(diceCardinal({ sides: 12, count: 1, bonus: 0 })).toBe(12);
    expect(diceCardinal({ sides: 8, count: 3, bonus: 1 })).toBe(512);
    expect(diceCardinal({ sides: 6, count: 2, bonus: -2 })).toBe(36);
  });
});

describe('dice values cardinal', () => {
  it('should return dice.max - dice.min + 1', () => {
    expect(diceValuesCardinal({ sides: 6, count: 2, bonus: 0 })).toBe(11);
    expect(diceValuesCardinal({ sides: 12, count: 1, bonus: 0 })).toBe(12);
    expect(diceValuesCardinal({ sides: 8, count: 3, bonus: 1 })).toBe(22);
    expect(diceValuesCardinal({ sides: 6, count: 2, bonus: -2 })).toBe(11);
  });
});

describe('dice bonus to string', () => {
  it('should return a string corresponding to the bonus', () => {
    expect(diceBonusSerialize({ sides: 6, count: 2, bonus: 0 })).toBe('');
    expect(diceBonusSerialize({ sides: 12, count: 1, bonus: 1 })).toBe('+1');
    expect(diceBonusSerialize({ sides: 8, count: 3, bonus: 1000 })).toBe(
      '+1000'
    );
    expect(diceBonusSerialize({ sides: 6, count: 2, bonus: -2 })).toBe('-2');
  });
});

describe('dice serialize', () => {
  it('should return a string corresponding to the dice', () => {
    expect(diceSerialize({ sides: 6, count: 2, bonus: 0 })).toBe('2d6');
    expect(diceSerialize({ sides: 12, count: 1, bonus: 1 })).toBe('1d12+1');
    expect(diceSerialize({ sides: 8, count: 3, bonus: 1 })).toBe('3d8+1');
    expect(diceSerialize({ sides: 6, count: 2, bonus: -2 })).toBe('2d6-2');
  });
});

describe('dice parse', () => {
  it('should return a dice corresponding to the string', () => {
    expect(diceParse('2d6')).toEqual({ sides: 6, count: 2, bonus: 0 });
    expect(diceParse('1d12+1')).toEqual({ sides: 12, count: 1, bonus: 1 });
    expect(diceParse('3d8+1')).toEqual({ sides: 8, count: 3, bonus: 1 });
    expect(diceParse('2d6-2')).toEqual({ sides: 6, count: 2, bonus: -2 });

    expect(() => diceParse('should not parse')).toThrow();
    expect(() => diceParse('d2')).toThrow();
    expect(() => diceParse('1+2')).toThrow();
    expect(() => diceParse('-3')).toThrow();
    expect(() => diceParse('x')).toThrow();
  });
});

describe('dice roll', () => {
  describe('default generator', () => {
    const integer = DiceRg.integer;
    beforeAll(() => {
      let i = 0;
      const f = jest.fn((props: { min: number; max: number }) => {
        return (i++ % (props.max - props.min)) + props.min;
      });

      DiceRg.integer = f;
    });

    it('should return the result of the dice roll', () => {
      expect(diceRoll({ sides: 6, count: 2, bonus: 0 })).toEqual({
        dice: { sides: 6, count: 2, bonus: 0 },
        diceValues: [1, 2],
        total: 3,
      });
      expect(diceRoll({ sides: 12, count: 1, bonus: 1 })).toEqual({
        dice: { sides: 12, count: 1, bonus: 1 },
        diceValues: [3],
        total: 4,
      });
      expect(diceRoll({ sides: 8, count: 3, bonus: 1 })).toEqual({
        dice: { sides: 8, count: 3, bonus: 1 },
        diceValues: [4, 5, 6],
        total: 16,
      });
      expect(diceRoll({ sides: 6, count: 2, bonus: -2 })).toEqual({
        dice: { sides: 6, count: 2, bonus: -2 },
        diceValues: [2, 3],
        total: 3,
      });
    });

    afterAll(() => {
      DiceRg.integer = integer;
    });
  });

  describe('custom generator', () => {
    // the seed is not useful as we mock it but test result remain consistent
    const gen = new Chance.Chance('test');
    let i = 0;
    const f = jest.fn((props: { min: number; max: number }) => {
      return (i++ % (props.max - props.min)) + props.min;
    });

    gen.integer = f;

    it('should return the result of the dice roll', () => {
      expect(diceRoll({ sides: 6, count: 2, bonus: 0 }, gen)).toEqual({
        dice: { sides: 6, count: 2, bonus: 0 },
        diceValues: [1, 2],
        total: 3,
      });
      expect(diceRoll({ sides: 12, count: 1, bonus: 1 }, gen)).toEqual({
        dice: { sides: 12, count: 1, bonus: 1 },
        diceValues: [3],
        total: 4,
      });
      expect(diceRoll({ sides: 8, count: 3, bonus: 1 }, gen)).toEqual({
        dice: { sides: 8, count: 3, bonus: 1 },
        diceValues: [4, 5, 6],
        total: 16,
      });
      expect(diceRoll({ sides: 6, count: 2, bonus: -2 }, gen)).toEqual({
        dice: { sides: 6, count: 2, bonus: -2 },
        diceValues: [2, 3],
        total: 3,
      });
    });
  });
});

describe('dice roll generator', () => {
  describe('default generator', () => {
    it('should roll number between dice.min and dice.max', () => {
      const gen = diceRollGenerator({ sides: 6, count: 2, bonus: 0 });
      for (let i = 0; i < 100; ++i) {
        const roll = gen.next();
        expect(roll.done).toBeFalsy();
        expect(roll.value.total).toBeGreaterThanOrEqual(2);
        expect(roll.value.total).toBeLessThanOrEqual(12);
      }
    });
  });

  describe('custom generator', () => {
    it('should roll number between dice.min and dice.max', () => {
      const gen = diceRollGenerator(
        { sides: 6, count: 2, bonus: 0 },
        new Chance.Chance('test')
      );
      for (let i = 0; i < 100; ++i) {
        const roll = gen.next();
        expect(roll.done).toBeFalsy();
        expect(roll.value.total).toBeGreaterThanOrEqual(2);
        expect(roll.value.total).toBeLessThanOrEqual(12);
      }
    });
  });
});
