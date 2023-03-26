const MagicSchoolNames = [
  'abjuration',
  'conjuration',
  'divination',
  'enchantment',
  'evocation',
  'illusion',
  'necromancy',
  'transmutation',
] as const;

type MagicSchoolNamesTuple = typeof MagicSchoolNames;
export type MagicSchoolName = MagicSchoolNamesTuple[number];
