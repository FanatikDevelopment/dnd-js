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
