import { DiceProps } from '@dnd-js/dice';
import { DamageType } from '../../health/types';
import { Item } from '../types';

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

export const SimpleWeaponTypes = [
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

export type WeaponDamageValue = DiceProps | string | number;
export type WeaponDamage = {
  type: DamageType;
  value: DiceProps | string | number;
};
export type WeaponDamageMap = Map<DamageType, WeaponDamageValue[]>;

export type WeaponProperty =
  | 'light'
  | 'heavy'
  | 'finesse'
  | 'thrown'
  | 'two-handed'
  | 'versatile'
  | 'ammunition'
  | 'loading'
  | 'reach'
  | 'special';
export interface Weapon<T = unknown> extends Item<T> {
  category: WeaponCategory;
  rangeType: WeaponRangeType;
  range?: WeaponRange;
  type: WeaponType;
  oneHandedDamages?: WeaponDamageMap;
  twoHandedDamages?: WeaponDamageMap;
  throwable: boolean;
  properties: WeaponProperty[];
}
