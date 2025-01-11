import { Combatant } from './types';

export type MovingCreature = {
  move: {
    max: number;
    remaining: number;
  };
};

export type Character = Combatant & MovingCreature;

export function getCombatOrder<T extends Pick<Combatant, 'roll'>>(
  combatants: T[]
): T[] {
  const order: [T, number][] = combatants.map((current) => [
    current,
    current.roll('dexterity'),
  ]);
  order.sort((a, b) => {
    let i = 0;
    while (a[1] === b[1]) {
      a[1] = a[0].roll('dexterity');
      b[1] = b[0].roll('dexterity');
      ++i;
      if (i > 1000) {
        throw new Error(
          'Rolling initiative always return equal numbers, stop after 1000 rolls'
        );
      }
    }

    return b[1] - a[1];
  });

  return order.map((current) => current[0]);
}

export function getSurprised<T extends Pick<Combatant, 'roll'>>(
  attacker: T[],
  attackee: T[]
): T[] {
  if (!attacker.length || !attackee.length) {
    return [];
  }

  const stealthScore = attacker.reduce<number>(
    (min, current) => Math.min(min, current.roll('stealth')),
    100000
  );

  return attackee.filter(
    (current) => current.roll('passive-perception') < stealthScore
  );
}
