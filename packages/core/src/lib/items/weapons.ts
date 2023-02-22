import { DamageType } from '../health/type';
import { Item } from './types';

export type WeaponCategory = 'simple' | 'martial';
export type WeaponRangeType = 'melee' | 'ranged';

const WeaponTypes = [
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
  'unarmed-strike',
  'crossbow-light',
  'dart',
  'shortbow',
  'sling',
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
  'longbowRange',
] as const;

type WeaponTypesTuple = typeof WeaponTypes;
export type WeaponType = WeaponTypesTuple[number];

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
