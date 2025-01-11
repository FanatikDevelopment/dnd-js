import { AbilityName, SkillName } from '../abilities/types';

export interface Combatant {
  id: string;
  isDead: boolean;
  move: number;
  actions: number;
  bonusActions: number;

  roll: (skill: SkillName | AbilityName) => number;
  onReactionTrigger(
    source: unknown,
    event: unknown,
    ...args: unknown[]
  ): boolean;
}
