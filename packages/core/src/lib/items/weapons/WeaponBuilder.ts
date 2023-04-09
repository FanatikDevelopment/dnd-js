import { DamageType } from '../../health/types';
import ItemBuilder from '../ItemBuilder';
import {
  Weapon,
  WeaponCategory,
  WeaponDamage,
  WeaponDamageMap,
  WeaponDamageValue,
  WeaponProperty,
  WeaponRange,
  WeaponRangeType,
  WeaponType,
} from './types';
import {
  getWeaponCategory,
  getWeaponCost,
  getWeaponDamage,
  getWeaponProperties,
  getWeaponRange,
  getWeaponRangeType,
  getWeaponWeight,
  isWeaponThrowable,
} from './utils';

export type WeaponBuilderOptions<T = unknown> = Omit<
  Pick<Weapon<T>, 'type'> & Partial<Weapon<T>>,
  'itemType'
>;

export default class WeaponBuilder<T = unknown> extends ItemBuilder<T> {
  public override readonly base: Weapon<T>;

  protected override result: Partial<Weapon<T>>;

  constructor({ type, ...options }: WeaponBuilderOptions<T>) {
    super({ name: type, ...options, itemType: 'weapon' });
    this.base = Object.assign<
      Partial<Weapon<T>>,
      Partial<Weapon<T>>,
      Partial<Weapon<T>>
    >(
      {
        type,
        category: getWeaponCategory(type),
        rangeType: getWeaponRangeType(type),
        range: getWeaponRange(type),
        cost: getWeaponCost(type),
        ...getWeaponDamage(type),
        throwable: isWeaponThrowable(type),
        properties: getWeaponProperties(type),
        weight: getWeaponWeight(type),
      },
      super.base,
      options
    ) as Weapon<T>;

    this.result = {};
  }

  get type(): WeaponType {
    this.result.type = this.result.type ?? this.base.type;

    return this.result.type;
  }

  set type(value: WeaponType) {
    this.result.type = value;
  }

  get category(): WeaponCategory {
    this.result.category = this.result.category ?? this.base.category;

    return this.result.category;
  }

  set category(value: WeaponCategory) {
    this.result.category = value;
  }

  get rangeType(): WeaponRangeType {
    this.result.rangeType = this.result.rangeType ?? this.base.rangeType;

    return this.result.rangeType;
  }

  set rangeType(value: WeaponRangeType) {
    this.result.rangeType = value;
  }

  get range(): WeaponRange | undefined {
    this.result.range = this.result.range ?? this.base.range;

    return this.result.range;
  }

  set range(value: WeaponRange | undefined) {
    this.result.range = value;
  }

  get oneHandedDamages(): WeaponDamageMap | undefined {
    this.result.oneHandedDamages =
      this.result.oneHandedDamages ?? this.base.oneHandedDamages;

    return this.result.oneHandedDamages;
  }

  set oneHandedDamages(value: WeaponDamageMap | undefined) {
    this.result.oneHandedDamages = value;
  }

  get twoHandedDamages(): WeaponDamageMap | undefined {
    this.result.twoHandedDamages =
      this.result.twoHandedDamages ?? this.base.twoHandedDamages;

    return this.result.twoHandedDamages;
  }

  set twoHandedDamages(value: WeaponDamageMap | undefined) {
    this.result.oneHandedDamages = value;
  }

  get throwable(): boolean {
    this.result.throwable = this.result.throwable ?? this.base.throwable;

    return this.result.throwable;
  }

  set throwable(value: boolean) {
    this.result.throwable = value;
    if (value) {
      if (!this.range) {
        this.range = {
          normal: 20,
          long: 60,
        };
      }

      return;
    }

    if (this.rangeType !== 'ranged') {
      this.range = undefined;
    }
  }

  get properties(): WeaponProperty[] {
    this.result.properties = this.result.properties ?? this.base.properties;

    return this.result.properties;
  }

  set properties(value: WeaponProperty[]) {
    this.result.properties = value;
  }

  withOneHandedDamage(...damages: WeaponDamage[]): this {
    const map =
      this.oneHandedDamages ?? new Map<DamageType, WeaponDamageValue[]>();
    damages.forEach(({ type, value }) => {
      const damageArr = map.get(type) ?? [];
      damageArr.push(value);
      map.set(type, damageArr);
    });

    return this;
  }

  withoutOneHandedDamage(...damages: WeaponDamage[]): this {
    const map =
      this.oneHandedDamages ?? new Map<DamageType, WeaponDamageValue[]>();
    damages.forEach(({ type, value }) => {
      const damageArr = map.get(type) ?? [];
      map.set(
        type,
        damageArr.filter((current) => current !== value)
      );
    });

    return this;
  }

  withTwoHandedDamage(...damages: WeaponDamage[]): this {
    const map =
      this.twoHandedDamages ?? new Map<DamageType, WeaponDamageValue[]>();
    damages.forEach(({ type, value }) => {
      const damageArr = map.get(type) ?? [];
      damageArr.push(value);
      map.set(type, damageArr);
    });

    return this;
  }

  withoutTwoHandedDamage(...damages: WeaponDamage[]): this {
    const map =
      this.twoHandedDamages ?? new Map<DamageType, WeaponDamageValue[]>();
    damages.forEach(({ type, value }) => {
      const damageArr = map.get(type) ?? [];
      map.set(
        type,
        damageArr.filter((current) => current !== value)
      );
    });

    return this;
  }

  withProperties(...properties: WeaponProperty[]): this {
    this.properties.push(...properties);

    return this;
  }

  withoutProperties(...properties: WeaponProperty[]): this {
    this.properties = this.properties.filter(
      (current) => !properties.includes(current)
    );

    return this;
  }

  override build(): Weapon<T> {
    let properties = this.properties;
    if (this.twoHandedDamages) {
      if (this.oneHandedDamages) {
        properties.push('versatile');
      } else {
        properties.push('two-handed');
      }
    }

    if (this.throwable) {
      properties.push('thrown');
    }

    properties = [...new Set(properties)];

    return Object.assign({}, this.base, this.result, {
      properties,
    }) as Weapon<T>;
  }
}
