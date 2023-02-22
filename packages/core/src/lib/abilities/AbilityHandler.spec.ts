import AbilityHandler from './AbilityHandler';
import { d20 } from '../utils';

describe('AbilityHandler', () => {
  describe('value', () => {
    it('should return the value unchanged if no handle function', () => {
      expect(new AbilityHandler({ api: { id: 'test' } }).value(1)).toBe(1);
    });

    it('should return the handled result', () => {
      expect(
        new AbilityHandler({
          api: { id: 'test', value: (val) => val * 2 },
        }).value(1)
      ).toBe(2);
    });
  });

  describe('modifier', () => {
    it('should return the modifier unchanged if no handle function', () => {
      expect(new AbilityHandler({ api: { id: 'test' } }).modifier(1)).toBe(1);
    });

    it('should return the handled result', () => {
      expect(
        new AbilityHandler({
          api: { id: 'test', modifier: (val) => val * 2 },
        }).modifier(1)
      ).toBe(2);
    });
  });

  describe('check', () => {
    const realRoll = d20.roll;

    beforeAll(() => {
      d20.roll = jest.fn(() => ({ dice: d20, diceValues: [1], total: 1 }));
    });

    afterAll(() => {
      d20.roll = realRoll;
    });

    it('should return the check unchanged if no handle function', () => {
      expect(
        new AbilityHandler({ api: { id: 'test' } }).check({
          check: 1,
          ability: 10,
          modifier: 0,
          rawAbility: 10,
          dice: d20,
        })
      ).toBe(1);
    });

    it('should return the handled result', () => {
      expect(
        new AbilityHandler({
          api: {
            id: 'test',
            check: (val) => {
              return val.check * 2;
            },
          },
        }).check({
          check: 1,
          ability: 10,
          modifier: 0,
          rawAbility: 10,
          dice: d20,
        })
      ).toBe(2);
    });
  });
});
