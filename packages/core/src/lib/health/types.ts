export const ConditionNames = [
  'blinded',
  'charmed',
  'deafened',
  'exhaustion',
  'frightened',
  'grappled',
  'incapacitated',
  'invisible',
  'paralyzed',
  'petrified',
  'poisoned',
  'prone',
  'restrained',
  'stunned',
  'unconscious',
] as const;

type ConditionNamesTuple = typeof ConditionNames;
export type ConditionName = ConditionNamesTuple[number];

export const DamageTypes = [
  'acid',
  'bludgeoning',
  'cold',
  'fire',
  'force',
  'lightning',
  'necrotic',
  'piercing',
  'poison',
  'psychic',
  'radiant',
  'slashing',
  'thunder',
] as const;

type DamageTypesTuple = typeof DamageTypes;
export type DamageType = DamageTypesTuple[number];

export type DamageResistanceType = 'resist' | 'vulnerable';
export type DamageResistances = {
  [k in DamageType]: DamageResistanceType;
};
