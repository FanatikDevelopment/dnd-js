import DiceProxy from './DiceProxy';
import { DiceRg } from './utils';

describe('dice min', () => {
  it('should be consistent', () => {
    expect(new DiceProxy({}).toString()).toBe('1d2');
    expect(new DiceProxy({ sides: 6 }).toString()).toBe('1d6');
    expect(new DiceProxy({ bonus: -3 }).toString()).toBe('1d2-3');
    expect(() => new DiceProxy({ sides: -12, count: 1, bonus: 0 })).toThrow();
    expect(() => new DiceProxy({ sides: 1, count: 1, bonus: 0 })).toThrow();
    expect(() => new DiceProxy({ sides: 6, count: -1, bonus: 0 })).toThrow();
    expect(() => new DiceProxy({ sides: 6, count: 0, bonus: 0 })).toThrow();
  });

  it('should return count + bonus', () => {
    expect(new DiceProxy({ sides: 6, count: 2, bonus: 0 }).min).toBe(2);
    expect(new DiceProxy({ sides: 12, count: 1, bonus: 0 }).min).toBe(1);
    expect(new DiceProxy({ sides: 8, count: 3, bonus: 1 }).min).toBe(4);
    expect(new DiceProxy({ sides: 6, count: 2, bonus: -2 }).min).toBe(0);
  });
});

describe('dice max', () => {
  it('should return sides * count + bonus', () => {
    expect(new DiceProxy({ sides: 6, count: 2, bonus: 0 }).max).toBe(12);
    expect(new DiceProxy({ sides: 12, count: 1, bonus: 0 }).max).toBe(12);
    expect(new DiceProxy({ sides: 8, count: 3, bonus: 1 }).max).toBe(25);
    expect(new DiceProxy({ sides: 6, count: 2, bonus: -2 }).max).toBe(10);
  });
});

describe('dice cardinal', () => {
  it('should return sides ** count', () => {
    expect(new DiceProxy({ sides: 6, count: 2, bonus: 0 }).cardinal).toBe(36);
    expect(new DiceProxy({ sides: 12, count: 1, bonus: 0 }).cardinal).toBe(12);
    expect(new DiceProxy({ sides: 8, count: 3, bonus: 1 }).cardinal).toBe(512);
    expect(new DiceProxy({ sides: 6, count: 2, bonus: -2 }).cardinal).toBe(36);
  });
});

describe('dice values cardinal', () => {
  it('should return dice.max - dice.min + 1', () => {
    expect(new DiceProxy({ sides: 6, count: 2, bonus: 0 }).valuesCardinal).toBe(
      11
    );
    expect(
      new DiceProxy({ sides: 12, count: 1, bonus: 0 }).valuesCardinal
    ).toBe(12);
    expect(new DiceProxy({ sides: 8, count: 3, bonus: 1 }).valuesCardinal).toBe(
      22
    );
    expect(
      new DiceProxy({ sides: 6, count: 2, bonus: -2 }).valuesCardinal
    ).toBe(11);
  });
});

describe('dice serialize', () => {
  it('should return a string corresponding to the dice', () => {
    expect(new DiceProxy({ sides: 6, count: 2, bonus: 0 }).toString()).toBe(
      '2d6'
    );
    expect(new DiceProxy({ sides: 12, count: 1, bonus: 1 }).toString()).toBe(
      '1d12+1'
    );
    expect(new DiceProxy({ sides: 8, count: 3, bonus: 1 }).toString()).toBe(
      '3d8+1'
    );
    expect(new DiceProxy({ sides: 6, count: 2, bonus: -2 }).toString()).toBe(
      '2d6-2'
    );
  });

  it('should return a json corresponding to the dice string', () => {
    expect(new DiceProxy({ sides: 6, count: 2, bonus: 0 }).toJSON()).toBe(
      '2d6'
    );
    expect(new DiceProxy({ sides: 12, count: 1, bonus: 1 }).toJSON()).toBe(
      '1d12+1'
    );
    expect(new DiceProxy({ sides: 8, count: 3, bonus: 1 }).toJSON()).toBe(
      '3d8+1'
    );
    expect(new DiceProxy({ sides: 6, count: 2, bonus: -2 }).toJSON()).toBe(
      '2d6-2'
    );
  });
});

describe('dice parse', () => {
  it('should return a dice corresponding to the string', () => {
    expect(new DiceProxy('2d6').sides).toBe(6);
    expect(new DiceProxy('1d12+1').count).toBe(1);
    expect(new DiceProxy('3d8+1').count).toBe(3);
    expect(new DiceProxy('2d6-2').bonus).toBe(-2);
  });
});

describe('dice roll', () => {
  const integer = DiceRg.integer;

  beforeAll(() => {
    let i = 0;
    const f = jest.fn((props: { min: number; max: number }) => {
      return (i++ % (props.max - props.min)) + props.min;
    });

    DiceRg.integer = f;
  });

  it('should return a string corresponding to the dice', () => {
    expect(
      new DiceProxy({ sides: 6, count: 2, bonus: 0 }).roll().total
    ).toEqual(3);
    expect(new DiceProxy({ sides: 12, count: 1, bonus: 1 }).roll().total).toBe(
      4
    );
    expect(new DiceProxy({ sides: 8, count: 3, bonus: 1 }).roll().total).toBe(
      16
    );
    expect(new DiceProxy({ sides: 6, count: 2, bonus: -2 }).roll().total).toBe(
      3
    );
  });

  afterAll(() => {
    DiceRg.integer = integer;
  });
});

describe('dice roll generator', () => {
  it('should roll number between dice.min and dice.max', () => {
    const gen = new DiceProxy({ sides: 6, count: 2, bonus: 0 }).generator();
    for (let i = 0; i < 100; ++i) {
      const roll = gen.next();
      expect(roll.done).toBeFalsy();
      expect(roll.value.total).toBeGreaterThanOrEqual(2);
      expect(roll.value.total).toBeLessThanOrEqual(12);
    }
  });
});
