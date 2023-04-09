import { Abilities } from '../abilities/types';
import {
  AbilityBonus,
  AlignmentShort,
  DamageResistanceBonus,
  LanguageName,
  NOf,
  ProficiencyName,
  SavingThrowBonus,
  SavingThrows,
  SizeShort,
} from '../common/types';
import { DamageResistances, DamageType } from '../health/types';

export interface Race {
  name: string;
  size: SizeShort;
  speed: number;
  darkVision: number;
  languages: LanguageName[];
  languageSelectors: NOf<LanguageName>[];
  alignments: AlignmentShort[];
  abilityBonuses: Partial<Abilities>;
  abilityBonusSelectors: NOf<AbilityBonus>[];
  savingThrows: Partial<SavingThrows>;
  savingThrowSelectors: NOf<SavingThrowBonus>[];
  damageResistances: Partial<DamageResistances>;
  damageResistanceSelectors: NOf<DamageResistanceBonus>[];
  proficiencies: ProficiencyName[];
  proficiencySelectors: NOf<ProficiencyName>[];
  fragmentSelectors: NOf<Partial<Race>>[];
  traits: string[];
}

export const DragonbornAncestryTypes = [
  'black',
  'bronze',
  'copper',
  'silver',
  'blue',
  'green',
  'red',
  'brass',
  'gold',
  'white',
] as const;

export const DragonbornAncestryDamage: Record<
  DragonbornAncestryType,
  DamageType
> = {
  black: 'acid',
  bronze: 'lightning',
  copper: 'acid',
  silver: 'cold',
  blue: 'lightning',
  green: 'poison',
  red: 'fire',
  brass: 'fire',
  gold: 'fire',
  white: 'cold',
};

type DragonbornAncestryTypesTuple = typeof DragonbornAncestryTypes;
export type DragonbornAncestryType = DragonbornAncestryTypesTuple[number];
