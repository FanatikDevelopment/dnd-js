import { Effect } from '../common';

export const CurrencyShortNames = ['pp', 'ep', 'gp', 'sp', 'cp'] as const;
type CurrencyShortNamesTuple = typeof CurrencyShortNames;
export type CurrencyShortName = CurrencyShortNamesTuple[number];

export type MarketValue = {
  [k in CurrencyShortName]?: number;
};

export function isMarketValue(o: unknown): o is MarketValue {
  if (typeof o !== 'object') {
    return false;
  }

  for (const cur of CurrencyShortNames) {
    if (typeof (o as any)[cur] === 'number') {
      return true;
    }
  }

  return false;
}

export const ItemTypes = [
  'adventuring-gear',
  'ammunition',
  'arcane-foci',
  'armor',
  'artisan-tools',
  'druidic-foci',
  'equipment-pack',
  'gaming-set',
  'holy-symbol',
  'kit',
  'weapon',
  'animal',
  'vehicle',
  'musical-instrument',
  'other-tool',
  'potion',
  'ring',
  'rod',
  'scroll',
  'shield',
  'staff',
  'standard-gear',
  'tool',
  'wand',
  'wondrous-item',
] as const;

type ItemTypesTuple = typeof ItemTypes;
export type ItemType = ItemTypesTuple[number];

export interface Item<T = unknown> {
  name: string;
  itemType: ItemType;
  cost: MarketValue;
  weight: number;
  description: string;
  effects: Effect[];
  extra?: T;
}

export function isItem<T = unknown>(o: unknown): o is Item<T> {
  if (typeof o !== 'object') {
    return false;
  }

  const item = o as Partial<Item<T>>;
  if (typeof item.name !== 'string') {
    return false;
  }

  if (!item.itemType || !ItemTypes.includes(item.itemType)) {
    return false;
  }

  if (!isMarketValue(item.cost)) {
    return false;
  }

  if (typeof item.weight !== 'number') {
    return false;
  }

  if (typeof item.description !== 'string') {
    return false;
  }

  return true;
}
