import { Dice } from '@dnd-js/dice';
import { d20 } from '../utils';

export function abilityModifier(abilityValue: number): number {
  return Math.floor((abilityValue - 10) / 2);
}

export function abilityCheck(abilityValue: number, d: Dice = d20): number {
  return d.roll().total + abilityModifier(abilityValue);
}
