import { Abilities } from '../abilities/types';
import { NOf } from '../common/types';
import { ToolName } from '../items/tools';
import { WeaponType } from '../items/weapons';

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
export type ProficiencyName = WeaponType | ToolName;

export interface Race {
  name: string;
  size: SizeShort;
  speed: number;
  darkVision: number;
  languages: string[];
  alignments: AlignmentShort[];
  abilityBonuses: Partial<Abilities>;
  proficiencies: (WeaponType | ToolName)[];
  proficiencySelectors: NOf<ProficiencyName>[];
  traits: string[];
}
