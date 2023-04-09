import ItemBuilder from '../ItemBuilder';
import { Armor } from './types';
import {
  armorHasStealthDisadvantage,
  armorUsesDexBonus,
  getArmorMaxDexBonus,
} from './utils';

export type ArmorBuilderOptions<T = unknown> = Omit<
  Pick<Armor<T>, 'name' | 'category'> & Partial<Armor<T>>,
  'itemType'
>;

export default class ArmorBuilder<T = unknown> extends ItemBuilder<T> {
  public override readonly base: Armor<T>;

  protected override result: Partial<Armor<T>>;

  constructor({ category, ...options }: ArmorBuilderOptions<T>) {
    super({ ...options, itemType: 'armor' });
    this.base = Object.assign<
      Partial<Armor<T>>,
      Partial<Armor<T>>,
      Partial<Armor<T>>
    >(
      {
        category,
        armorClass: 10,
        useDex: armorUsesDexBonus(category),
        maxDexBonus: getArmorMaxDexBonus(category),
        stealthDisadvantage: armorHasStealthDisadvantage(category),
      },
      super.base,
      options
    ) as Armor<T>;

    this.result = {};
  }

  get armorClass(): number {
    this.result.armorClass = this.result.armorClass ?? this.base.armorClass;

    return this.result.armorClass;
  }

  set armorClass(value: number) {
    this.armorClass = value;
  }

  get useDex(): boolean {
    this.result.useDex = this.result.useDex ?? this.base.useDex;

    return this.result.useDex;
  }

  set useDex(value: boolean) {
    this.useDex = value;
  }

  get maxDexBonus(): number | undefined {
    this.result.maxDexBonus = this.result.maxDexBonus ?? this.base.maxDexBonus;

    return this.result.maxDexBonus;
  }

  set maxDexBonus(value: number | undefined) {
    this.maxDexBonus = value;
  }

  get minStr(): number {
    this.result.minStr = this.result.minStr ?? this.base.minStr;

    return this.result.minStr;
  }

  set minStr(value: number) {
    this.minStr = value;
  }

  get stealthDisadvantage(): boolean {
    this.result.stealthDisadvantage =
      this.result.stealthDisadvantage ?? this.base.stealthDisadvantage;

    return this.result.stealthDisadvantage;
  }

  set stealthDisadvantage(value: boolean) {
    this.stealthDisadvantage = value;
  }

  override build(): Armor<T> {
    return Object.assign({}, this.base, this.result) as Armor<T>;
  }
}
