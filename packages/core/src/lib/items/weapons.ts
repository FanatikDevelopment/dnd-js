import { Item } from './types';

export type DamageType = string;

export type WeaponCategory = 'simple' | 'martial';
export type WeaponRangeType = 'melee' | 'ranged';

const MartialWeaponTypes = [
  'battleaxe',
  'flail',
  'glaive',
  'greataxe',
  'greatsword',
  'halberd',
  'lance',
  'longsword',
  'maul',
  'morningstar',
  'pike',
  'rapier',
  'scimitar',
  'shortsword',
  'trident',
  'war-pick',
  'warhammer',
  'whip',
  'blowgun',
  'crossbow-hand',
  'crossbow-heavy',
  'longbow',
  'net',
] as const;

type MartialWeaponTypesTuple = typeof MartialWeaponTypes;
export type MartialWeaponType = MartialWeaponTypesTuple[number];

const SimpleWeaponTypes = [
  'club',
  'dagger',
  'greatclub',
  'handaxe',
  'javelin',
  'light-hammer',
  'mace',
  'quarterstaff',
  'sickle',
  'spear',
  'crossbow-light',
  'dart',
  'shortbow',
  'sling',
] as const;

type SimpleWeaponTypesTuple = typeof SimpleWeaponTypes;
export type SimpleWeaponType = SimpleWeaponTypesTuple[number];

export type WeaponType = SimpleWeaponType | MartialWeaponType;

export type WeaponRange = {
  normal: number;
  long: number;
};

export type WeaponProperty =
  | 'light'
  | 'finesse'
  | 'thrown'
  | 'two-handed'
  | 'versatile';

export interface Weapon<T = unknown> extends Item<T> {
  id: string;
  name: string;
  category: WeaponCategory;
  rangeType: WeaponRangeType;
  range?: WeaponRange;
  type: WeaponType;
  damage: Record<DamageType, unknown>;
  properties: Record<WeaponProperty, unknown>;
}
