import { DiceProps } from '@dnd-js/dice';
import { DamageType } from '../../health/types';
import { MarketValue } from '../types';
import {
  WeaponCategory,
  WeaponRange,
  WeaponRangeType,
  WeaponType,
  WeaponProperty,
  WeaponDamageValue,
  WeaponDamageMap,
} from './types';

export function getWeaponCategory(type: WeaponType): WeaponCategory {
  switch (type) {
    case 'club':
    case 'dagger':
    case 'greatclub':
    case 'handaxe':
    case 'javelin':
    case 'light-hammer':
    case 'mace':
    case 'quarterstaff':
    case 'sickle':
    case 'spear':
    case 'crossbow-light':
    case 'dart':
    case 'shortbow':
    case 'sling':
      return 'simple';

    case 'battleaxe':
    case 'flail':
    case 'glaive':
    case 'greataxe':
    case 'greatsword':
    case 'halberd':
    case 'lance':
    case 'longsword':
    case 'maul':
    case 'morningstar':
    case 'pike':
    case 'rapier':
    case 'scimitar':
    case 'shortsword':
    case 'trident':
    case 'war-pick':
    case 'warhammer':
    case 'whip':
    case 'blowgun':
    case 'crossbow-hand':
    case 'crossbow-heavy':
    case 'longbow':
    case 'net':
      return 'martial';

    default:
      throw new Error(
        `Cannot get weapon category: unsupported weapon type '${type}`
      );
  }
}

export function getWeaponRangeType(type: WeaponType): WeaponRangeType {
  switch (type) {
    case 'club':
    case 'dagger':
    case 'greatclub':
    case 'handaxe':
    case 'javelin':
    case 'light-hammer':
    case 'mace':
    case 'quarterstaff':
    case 'sickle':
    case 'spear':
    case 'battleaxe':
    case 'flail':
    case 'glaive':
    case 'greataxe':
    case 'greatsword':
    case 'halberd':
    case 'lance':
    case 'longsword':
    case 'maul':
    case 'morningstar':
    case 'pike':
    case 'rapier':
    case 'scimitar':
    case 'shortsword':
    case 'trident':
    case 'war-pick':
    case 'warhammer':
    case 'whip':
      return 'melee';

    case 'crossbow-light':
    case 'dart':
    case 'shortbow':
    case 'sling':
    case 'blowgun':
    case 'crossbow-hand':
    case 'crossbow-heavy':
    case 'longbow':
    case 'net':
      return 'ranged';

    default:
      throw new Error(
        `Cannot get weapon range type: unsupported weapon type '${type}`
      );
  }
}

export function getWeaponRange(type: WeaponType): WeaponRange | undefined {
  switch (type) {
    case 'net':
      return { normal: 5, long: 15 };

    case 'dagger':
    case 'handaxe':
    case 'light-hammer':
    case 'spear':
    case 'trident':
    case 'dart':
      return { normal: 20, long: 60 };

    case 'blowgun':
      return { normal: 25, long: 100 };

    case 'javelin':
    case 'sling':
    case 'crossbow-hand':
      return { normal: 30, long: 120 };

    case 'crossbow-light':
    case 'shortbow':
      return { normal: 80, long: 320 };

    case 'crossbow-heavy':
      return { normal: 100, long: 400 };
    case 'longbow':
      return { normal: 150, long: 600 };

    default:
      return undefined;
  }
}

export function getWeaponCost(type: WeaponType): MarketValue {
  switch (type) {
    case 'dart':
      return { cp: 5 };

    case 'club':
    case 'sling':
      return { sp: 1 };

    case 'greatclub':
    case 'quarterstaff':
    case 'whip':
      return { sp: 2 };

    case 'javelin':
      return { sp: 5 };

    case 'sickle':
    case 'spear':
    case 'net':
      return { gp: 1 };

    case 'dagger':
    case 'light-hammer':
      return { gp: 2 };

    case 'handaxe':
    case 'mace':
    case 'pike':
    case 'trident':
    case 'war-pick':
      return { gp: 5 };

    case 'battleaxe':
    case 'flail':
    case 'lance':
    case 'maul':
    case 'shortsword':
    case 'blowgun':
      return { gp: 10 };

    case 'longsword':
    case 'morningstar':
    case 'warhammer':
      return { gp: 15 };

    case 'glaive':
    case 'halberd':
      return { gp: 20 };

    case 'crossbow-light':
    case 'shortbow':
    case 'rapier':
    case 'scimitar':
      return { gp: 25 };

    case 'greataxe':
      return { gp: 30 };

    case 'greatsword':
    case 'crossbow-heavy':
    case 'longbow':
      return { gp: 50 };

    case 'crossbow-hand':
      return { gp: 75 };

    default:
      return {};
  }
}

export function getWeaponDamage(type: WeaponType): {
  oneHandedDamage?: WeaponDamageMap;
  twoHandedDamage?: WeaponDamageMap;
} {
  switch (type) {
    case 'net':
      return {
        oneHandedDamage: new Map<DamageType, WeaponDamageValue[]>([]),
      };

    case 'blowgun':
      return {
        oneHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['piercing', [1]],
        ]),
      };

    case 'club':
    case 'light-hammer':
    case 'sling':
      return {
        oneHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['bludgeoning', ['1d4']],
        ]),
      };
    case 'dagger':
    case 'dart':
      return {
        oneHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['piercing', ['1d4']],
        ]),
      };
    case 'sickle':
    case 'whip':
      return {
        oneHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['slashing', ['1d4']],
        ]),
      };

    case 'mace':
      return {
        oneHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['bludgeoning', ['1d6']],
        ]),
      };

    case 'javelin':
    case 'shortsword':
      return {
        oneHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['piercing', ['1d6']],
        ]),
      };
    case 'handaxe':
    case 'scimitar':
      return {
        oneHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['slashing', ['1d6']],
        ]),
      };

    case 'flail':
      return {
        oneHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['bludgeoning', ['1d8']],
        ]),
      };
    case 'morningstar':
    case 'rapier':
    case 'war-pick':
      return {
        oneHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['piercing', ['1d8']],
        ]),
      };

    case 'lance':
      return {
        oneHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['piercing', ['1d12']],
        ]),
      };

    case 'shortbow':
      return {
        twoHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['piercing', ['1d6']],
        ]),
      };

    case 'greatclub':
      return {
        twoHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['bludgeoning', ['1d8']],
        ]),
      };

    case 'crossbow-light':
    case 'longbow':
      return {
        twoHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['piercing', ['1d8']],
        ]),
      };

    case 'pike':
    case 'crossbow-heavy':
      return {
        twoHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['piercing', ['1d10']],
        ]),
      };
    case 'glaive':
    case 'halberd':
      return {
        twoHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['slashing', ['1d10']],
        ]),
      };

    case 'greataxe':
      return {
        twoHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['slashing', ['1d12']],
        ]),
      };

    case 'maul':
      return {
        twoHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['bludgeoning', ['2d6']],
        ]),
      };
    case 'greatsword':
      return {
        twoHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['slashing', ['2d6']],
        ]),
      };

    case 'quarterstaff':
      return {
        oneHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['bludgeoning', ['1d6']],
        ]),
        twoHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['bludgeoning', ['1d8']],
        ]),
      };
    case 'spear':
    case 'trident':
      return {
        oneHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['piercing', ['1d6']],
        ]),
        twoHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['piercing', ['1d8']],
        ]),
      };

    case 'warhammer':
      return {
        oneHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['bludgeoning', ['1d8']],
        ]),
        twoHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['bludgeoning', ['1d10']],
        ]),
      };
    case 'battleaxe':
    case 'longsword':
      return {
        oneHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['slashing', ['1d8']],
        ]),
        twoHandedDamage: new Map<DamageType, WeaponDamageValue[]>([
          ['slashing', ['1d10']],
        ]),
      };

    default:
      throw new Error(
        `Cannot get weapon category: unsupported weapon type '${type}`
      );
  }
}

export function isWeaponThrowable(type: WeaponType): boolean {
  switch (type) {
    case 'dagger':
    case 'handaxe':
    case 'javelin':
    case 'light-hammer':
    case 'spear':
    case 'dart':
    case 'trident':
      return true;

    default:
      return false;
  }
}

export function getWeaponProperties(type: WeaponType): WeaponProperty[] {
  switch (type) {
    case 'club':
    case 'sickle':
      return ['light'];

    case 'dagger':
      return ['finesse', 'light', 'thrown'];

    case 'greatclub':
      return ['two-handed'];

    case 'handaxe':
    case 'light-hammer':
      return ['light', 'thrown'];

    case 'javelin':
      return ['thrown'];

    case 'quarterstaff':
    case 'battleaxe':
    case 'longsword':
    case 'warhammer':
      return ['versatile'];

    case 'spear':
    case 'trident':
      return ['thrown', 'versatile'];

    case 'crossbow-light':
      return ['ammunition', 'loading', 'two-handed'];
    case 'dart':
      return ['finesse', 'thrown'];

    case 'shortbow':
      return ['ammunition', 'two-handed'];

    case 'sling':
      return ['ammunition'];

    case 'glaive':
    case 'halberd':
    case 'pike':
      return ['heavy', 'reach', 'two-handed'];

    case 'greataxe':
    case 'greatsword':
    case 'maul':
      return ['heavy', 'two-handed'];

    case 'lance':
      return ['reach', 'special'];

    case 'rapier':
      return ['finesse'];

    case 'scimitar':
    case 'shortsword':
      return ['finesse', 'light'];

    case 'whip':
      return ['finesse', 'reach'];

    case 'blowgun':
      return ['ammunition', 'loading'];

    case 'crossbow-hand':
      return ['ammunition', 'light', 'loading'];

    case 'crossbow-heavy':
      return ['ammunition', 'heavy', 'loading', 'two-handed'];

    case 'longbow':
      return ['ammunition', 'heavy', 'two-handed'];

    case 'net':
      return ['special', 'thrown'];

    case 'mace':
    case 'flail':
    case 'morningstar':
    case 'war-pick':
      return [];

    default:
      throw new Error(
        `Cannot get weapon category: unsupported weapon type '${type}`
      );
  }
}

export function getWeaponWeight(type: WeaponType): number {
  switch (type) {
    case 'sling':
      return 0;

    case 'dart':
      return 1 / 4;

    case 'dagger':
    case 'blowgun':
      return 1;

    case 'club':
    case 'handaxe':
    case 'javelin':
    case 'light-hammer':
    case 'sickle':
    case 'shortbow':
    case 'flail':
    case 'rapier':
    case 'shortsword':
    case 'war-pick':
    case 'warhammer':
    case 'longbow':
      return 2;

    case 'spear':
    case 'longsword':
    case 'scimitar':
    case 'whip':
    case 'crossbow-hand':
      return 3;

    case 'mace':
    case 'quarterstaff':
    case 'battleaxe':
    case 'morningstar':
    case 'trident':
      return 4;

    case 'crossbow-light':
      return 5;

    case 'glaive':
    case 'greatsword':
    case 'halberd':
    case 'lance':
      return 6;

    case 'greataxe':
      return 7;

    case 'greatclub':
    case 'maul':
      return 10;

    case 'net':
      return 3;

    case 'pike':
    case 'crossbow-heavy':
      return 18;

    default:
      throw new Error(
        `Cannot get weapon category: unsupported weapon type '${type}`
      );
  }
}
