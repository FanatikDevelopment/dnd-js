import { Armor, Item, Shield, Weapon } from './items';

export type Equipment = {
  armor?: Armor;
  helmet?: Item;
  gloves?: Item;
  boots?: Item;
  belt?: Item;
  cloak?: Item;
  amulet?: Item;
  ringLeft?: Item;
  ringRight?: Item;
  mainHand?: Weapon;
  offHand?: Weapon | Shield;
};

export type EquipmentSlot = keyof Equipment;
