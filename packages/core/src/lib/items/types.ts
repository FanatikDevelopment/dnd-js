export const CurrencyShortNames = ['pp', 'ep', 'gp', 'sp', 'cp'] as const;
type CurrencyShortNamesTuple = typeof CurrencyShortNames;
export type CurrencyShortName = CurrencyShortNamesTuple[number];

export type MarketValue = {
  [k in CurrencyShortName]?: number;
};

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
  extra?: T;
}
