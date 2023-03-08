import { Dice } from '@dnd-js/dice';

export const AbilityNames = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
] as const;
type AbilityNameTuple = typeof AbilityNames;

export type AbilityName = AbilityNameTuple[number];

export type Abilities<T = number> = {
  [key in AbilityName]: T;
};

export type AbilityCheckOptions = {
  check: number;
  ability: number;
  modifier: number;
  rawAbility: number;
  dice?: Dice;
};

export interface AbilityApi {
  value: (ability: number) => number;
  modifier: (modifier: number) => number;
  check: (options: AbilityCheckOptions) => number;
}

export interface AbilityBonus extends Partial<AbilityApi> {
  id: string;
}
