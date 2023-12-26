import { Item } from '../types';

export const ArmorCategoryNames = ['light', 'medium', 'heavy'] as const;
type ArmorCategoryNamesTuple = typeof ArmorCategoryNames;
export type ArmorCategoryName = ArmorCategoryNamesTuple[number];

export const LightArmorTypes = [
  'leather-armor',
  'padded-armor',
  'studded-leather-armor',
] as const;

type LightArmorTypesTuple = typeof LightArmorTypes;
export type LightArmorType = LightArmorTypesTuple[number];

export const MediumArmorTypes = [
  'breastplate',
  'chain-shirt',
  'half-plate-armor',
  'hide-armor',
  'scale-mail',
] as const;

type MediumArmorTypesTuple = typeof MediumArmorTypes;
export type MediumArmorType = MediumArmorTypesTuple[number];

export const HeavyArmorTypes = [
  'chain-mail',
  'plate-armor',
  'ring-mail',
  'splint-armor',
] as const;

type HeavyArmorTypesTuple = typeof HeavyArmorTypes;
export type HeavyArmorType = HeavyArmorTypesTuple[number];

export type ArmorTypes = LightArmorType | MediumArmorType | HeavyArmorType;

export interface Armor<T = unknown> extends Item<T> {
  category: ArmorCategoryName;
  armorClass: number;
  useDex: boolean;
  maxDexBonus?: number;
  minStr: number;
  stealthDisadvantage: boolean;
}

export function isArmor<T = unknown>(item: Item<T>): item is Armor<T> {
  return item.itemType === 'armor';
}

export interface Shield<T = unknown> extends Item<T> {
  armorClassBonus: number;
}

export function isShield<T = unknown>(item: Item<T>): item is Shield<T> {
  return item.itemType === 'shield';
}
