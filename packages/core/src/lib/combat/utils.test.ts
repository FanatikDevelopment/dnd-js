import { AbilityName, SkillName } from '../abilities';
import { getCombatOrder, getSurprised } from './utils';

describe('getCombatOrder', () => {
  it('should return the same number of combattants', () => {
    expect(getCombatOrder([]).length).toBe(0);

    const combattants = [
      { id: 'a', roll: () => 1 },
      { id: 'b', roll: () => 2 },
      { id: 'c', roll: () => 3 },
      { id: 'd', roll: () => 4 },
    ];

    expect(getCombatOrder(combattants).length).toBe(combattants.length);
  });

  it('should be infinite loop proof', () => {
    const combattants = [
      { id: 'a', roll: () => 1 },
      { id: 'b', roll: () => 1 },
    ];

    expect(() => getCombatOrder(combattants)).toThrow();
  });

  it('should return the combatant in initiative descending order', () => {
    const combattants = [
      { id: 'a', roll: () => 1 },
      { id: 'b', roll: () => 2 },
      { id: 'c', roll: () => 3 },
      { id: 'd', roll: () => 4 },
    ];

    expect(getCombatOrder(combattants)).toEqual([...combattants].reverse());
  });

  it('should reroll in case of equality', () => {
    let cResult = 5;
    let dResult = 5;
    const combattants = [
      { id: 'a', roll: () => 1 },
      { id: 'b', roll: () => 2 },
      {
        id: 'c',
        roll: () => {
          return cResult++;
        },
      },
      {
        id: 'd',
        roll: () => {
          return dResult--;
        },
      },
    ];

    expect(getCombatOrder(combattants).map((current) => current.id)).toEqual([
      'c',
      'd',
      'b',
      'a',
    ]);
  });
});

describe('getSurprised', () => {
  it('should return an empty array if attacker or attackee are empty arrays', () => {
    const combattants = [
      { id: 'a', roll: () => 1 },
      { id: 'b', roll: () => 2 },
      { id: 'c', roll: () => 3 },
      { id: 'd', roll: () => 4 },
    ];

    expect(getSurprised([], []).length).toBe(0);
    expect(getSurprised(combattants, []).length).toBe(0);
    expect(getSurprised([], combattants).length).toBe(0);
  });

  it('should use the minimal stealth score of the attacker group', () => {
    const rollProducer =
      (val: { stealth: number; perception: number }) =>
      (skill: SkillName | AbilityName) => {
        switch (skill) {
          case 'stealth':
            return val.stealth;

          case 'passive-perception':
            return val.perception;

          default:
            return 0;
        }
      };

    const combattants = [
      { id: 'a', roll: rollProducer({ stealth: 10, perception: 8 }) },
      { id: 'b', roll: rollProducer({ stealth: 11, perception: 9 }) },
      { id: 'c', roll: rollProducer({ stealth: 12, perception: 10 }) },
      { id: 'd', roll: rollProducer({ stealth: 13, perception: 11 }) },
    ];

    expect(getSurprised(combattants, combattants)).toEqual([
      combattants[0],
      combattants[1],
    ]);
  });

  it('should return the attackees with a perception score below the stealth score', () => {
    const rollProducer =
      (val: { stealth: number; perception: number }) =>
      (skill: SkillName | AbilityName) => {
        switch (skill) {
          case 'stealth':
            return val.stealth;

          case 'passive-perception':
            return val.perception;

          default:
            return 0;
        }
      };

    const combattants = [
      { id: 'a', roll: rollProducer({ stealth: 10, perception: 8 }) },
      { id: 'b', roll: rollProducer({ stealth: 11, perception: 9 }) },
      { id: 'c', roll: rollProducer({ stealth: 12, perception: 10 }) },
      { id: 'd', roll: rollProducer({ stealth: 13, perception: 11 }) },
    ];

    expect(getSurprised(combattants, combattants)).toEqual([
      combattants[0],
      combattants[1],
    ]);
  });
});
