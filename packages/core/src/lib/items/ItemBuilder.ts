import { Effect } from '../common';
import { CurrencyShortName, ItemType, MarketValue, Item } from './types';

export type ItemBuilderOptions<T = unknown> = Pick<
  Item<T>,
  'name' | 'itemType'
> &
  Partial<Item<T>>;

export default class ItemBuilder<T = unknown> {
  public readonly base: Item<T>;

  protected result: Partial<Item<T>>;

  constructor(options: ItemBuilderOptions<T>) {
    this.base = Object.assign<Partial<Item<T>>, Partial<Item<T>>>(
      {
        cost: {},
        weight: 0,
        description: '',
        effects: [],
      },
      options
    ) as Item<T>;

    this.result = {};
  }

  reset(): void {
    this.result = {};
  }

  get name(): string {
    this.result.name = this.result.name ?? this.base.name;
    return this.result.name;
  }

  set name(value: string) {
    this.result.name = value;
  }

  get itemType(): ItemType {
    this.result.itemType = this.result.itemType ?? this.base.itemType;
    return this.result.itemType;
  }

  set itemType(value: ItemType) {
    this.result.itemType = value;
  }

  get cost(): MarketValue {
    this.result.cost = this.result.cost ?? this.base.cost;
    return this.result.cost;
  }

  set cost(value: MarketValue) {
    this.result.cost = value;
  }

  get weight(): number {
    this.result.weight = this.result.weight ?? this.base.weight;
    return this.result.weight;
  }

  set weight(value: number) {
    this.result.weight = value;
  }

  get description(): string {
    this.result.description = this.result.description ?? this.base.description;
    return this.result.description;
  }

  set description(value: string) {
    this.result.description = value;
  }

  get effects(): Effect[] {
    this.result.effects = this.result.effects ?? [...this.base.effects];
    return this.result.effects;
  }

  set effects(effects: Effect[]) {
    this.effects.push(...effects);
  }

  get extra(): T | undefined {
    this.result.extra = this.result.extra ?? this.base.extra;
    return this.result.extra;
  }

  set extra(value: T | undefined) {
    this.result.extra = value;
  }

  withCost(cost: MarketValue): this {
    for (const currency in cost) {
      const value = Math.max(
        0,
        cost[currency as CurrencyShortName]! +
          (this.cost[currency as CurrencyShortName] ?? 0)
      );
      this.cost[currency as CurrencyShortName] = value;
    }

    return this;
  }

  withEffect(...effects: Effect[]): this {
    this.effects.push(...effects);

    return this;
  }

  build(): Item<T> {
    return {
      ...this.base,
      ...this.result,
    };
  }
}
