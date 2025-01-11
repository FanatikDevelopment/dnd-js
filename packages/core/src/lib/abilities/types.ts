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

export const SkillNames = [
  'acrobatics',
  'animal-handling',
  'arcana',
  'athletics',
  'deception',
  'history',
  'insight',
  'intimidation',
  'investigation',
  'medicine',
  'nature',
  'passive-perception',
  'perception',
  'performance',
  'persuasion',
  'religion',
  'sleight-of-hand',
  'stealth',
  'survival',
] as const;
type SkillNameTuple = typeof SkillNames;

export type SkillName = SkillNameTuple[number];

export const SkillAbilityMap: Record<SkillName, AbilityName> = {
  acrobatics: 'dexterity',
  'animal-handling': 'wisdom',
  arcana: 'intelligence',
  athletics: 'strength',
  deception: 'charisma',
  history: 'intelligence',
  insight: 'wisdom',
  intimidation: 'charisma',
  investigation: 'intelligence',
  medicine: 'wisdom',
  nature: 'intelligence',
  'passive-perception': 'wisdom',
  perception: 'wisdom',
  performance: 'charisma',
  persuasion: 'charisma',
  religion: 'intelligence',
  'sleight-of-hand': 'dexterity',
  stealth: 'dexterity',
  survival: 'wisdom',
};
