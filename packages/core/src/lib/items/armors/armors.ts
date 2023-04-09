import ArmorBuilder from './ArmorBuilder';
import ShieldBuilder from './ShieldBuilder';

export const PaddedArmor = new ArmorBuilder({
  name: 'padded armor',
  category: 'light',
  cost: {
    gp: 5,
  },
  weight: 8,
  armorClass: 11,
  stealthDisadvantage: true,
}).build();

export const LeatherArmor = new ArmorBuilder({
  name: 'leather armor',
  category: 'light',
  cost: {
    gp: 10,
  },
  weight: 10,
  armorClass: 11,
}).build();

export const StuddedLeatherArmor = new ArmorBuilder({
  name: 'studded leather armor',
  category: 'light',
  cost: {
    gp: 45,
  },
  weight: 13,
  armorClass: 12,
}).build();

export const HideArmor = new ArmorBuilder({
  name: 'hide armor',
  cost: {
    gp: 10,
  },
  weight: 12,
  armorClass: 12,
  maxDexBonus: 2,
  category: 'light',
}).build();

export const ChainShirt = new ArmorBuilder({
  name: 'chain shirt',
  category: 'medium',
  cost: {
    gp: 50,
  },
  weight: 20,
  armorClass: 13,
}).build();

export const ScaleMail = new ArmorBuilder({
  name: 'scale mail',
  category: 'medium',
  cost: {
    gp: 50,
  },
  weight: 45,
  armorClass: 14,
  stealthDisadvantage: true,
}).build();

export const Breastplate = new ArmorBuilder({
  name: 'breastplate',
  category: 'medium',
  cost: {
    gp: 400,
  },
  weight: 20,
  armorClass: 14,
}).build();

export const HalfPlateArmor = new ArmorBuilder({
  name: 'half plate armor',
  category: 'medium',
  cost: {
    gp: 750,
  },
  weight: 40,
  armorClass: 15,
  stealthDisadvantage: true,
}).build();

export const RingMail = new ArmorBuilder({
  name: 'ring mail',
  category: 'heavy',
  cost: {
    gp: 30,
  },
  weight: 40,
  armorClass: 14,
}).build();

export const ChainMail = new ArmorBuilder({
  name: 'chain mail',
  category: 'heavy',
  cost: {
    gp: 75,
  },
  weight: 55,
  armorClass: 16,
  minStr: 13,
}).build();

export const SplintArmor = new ArmorBuilder({
  name: 'splint armor',
  category: 'heavy',
  cost: {
    gp: 200,
  },
  weight: 60,
  armorClass: 17,
  minStr: 15,
}).build();

export const PlateArmor = new ArmorBuilder({
  name: 'plate armor',
  category: 'heavy',
  cost: {
    gp: 1500,
  },
  weight: 65,
  armorClass: 18,
  minStr: 15,
}).build();

export const RegularArmors = [
  PaddedArmor,
  LeatherArmor,
  StuddedLeatherArmor,
  HideArmor,
  ChainShirt,
  ScaleMail,
  Breastplate,
  HalfPlateArmor,
  RingMail,
  ChainMail,
  SplintArmor,
  PlateArmor,
];

export const RegularShield = new ShieldBuilder({
  name: 'shield',
  cost: {
    gp: 10,
  },
  weight: 6,
}).build();
