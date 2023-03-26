import { DiceProps } from '@dnd-js/dice';
import { AbilityName } from '../abilities';

export interface Class {
  name: string;
  hitDice: DiceProps;
  spellCastingLevel: number;
  spellCastingAbility: AbilityName;
  spells: string[];
  multiClassing: unknown;
  startingEquipment: unknown;
  proficiencies: unknown;
  savingThrows: unknown;
}
