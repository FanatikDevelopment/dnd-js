import { AbilityName, SkillName } from '../abilities';
import { ConditionName, DamageResistances, DamageType } from '../health/types';
import { MusicalInstrumentName } from '../items/misc';
import { ToolName } from '../items/tools';
import { WeaponType } from '../items/weapons';

export const LanguageNames = [
  'abyssal',
  'celestial',
  'common',
  'deep-speech',
  'demonic',
  'draconic',
  'dwarvish',
  'elvish',
  'giant',
  'gnomish',
  'goblin',
  'halfling',
  'infernal',
  'orc',
  'primordial',
  'sylvan',
  'undercommon',
] as const;
type LanguageNameTuple = typeof LanguageNames;
export type LanguageName = LanguageNameTuple[number];

export type AlignmentShort =
  | 'lg'
  | 'ln'
  | 'le'
  | 'ng'
  | 'n'
  | 'ne'
  | 'cg'
  | 'cn'
  | 'ce';
export type SizeShort = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ProficiencyName =
  | WeaponType
  | ToolName
  | MusicalInstrumentName
  | SkillName
  | 'shields';

export type AbilityBonus = { ability: AbilityName; bonus: number };
export type DamageResistanceBonus = {
  type: DamageType;
  resistance: DamageResistances;
};

export type RollModifier = 'advantage' | 'disadvantage';

export type SavingThrowType = AbilityName | DamageType | ConditionName;

export type SavingThrows = {
  [k in SavingThrowType]: RollModifier;
};

export type SavingThrowBonus = {
  type: SavingThrowType;
  bonus: RollModifier;
};

export interface MiddleWare<Api> {
  next?: MiddleWare<Api>;
  api: Api;
}

export type NOf<T> = {
  n: number;
  of: T[];
};

export const checkNOf =
  <T>(config: NOf<T>) =>
  (selected: T[]) => {
    if (selected.length !== config.n) {
      throw new Error(
        `Selection failure: length mismatch, expected ${
          config.n
        } of ${JSON.stringify(config.of)} received ${selected}`
      );
    }

    if (selected.find((current) => !config.of.includes(current))) {
      throw new Error(
        `Selection failure: value mismatch, expected ${
          config.n
        } of ${JSON.stringify(config.of)} received ${selected}`
      );
    }
  };

export type Effect = {
  name: string;
  description: string;

  canApply: (source: unknown, target: unknown) => boolean;
  apply: (source: unknown, target: unknown, ...args: any) => any;
  unapply: (source: unknown, target: unknown, ...args: any) => any;
};
