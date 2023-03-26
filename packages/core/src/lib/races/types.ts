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
import { DamageResistances } from '../health/types';

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
  traits: string[];
}

export const DragonbornAncestryTypes = [
  'draconic-ancestry-black',
  'draconic-ancestry-bronze',
  'draconic-ancestry-copper',
  'draconic-ancestry-silver',
  'draconic-ancestry-blue',
  'draconic-ancestry-green',
  'draconic-ancestry-red',
  'draconic-ancestry-brass',
  'draconic-ancestry-gold',
  'draconic-ancestry-white',
] as const;

type DragonbornAncestryTypesTuple = typeof DragonbornAncestryTypes;
export type DragonbornAncestryType = DragonbornAncestryTypesTuple[number];
