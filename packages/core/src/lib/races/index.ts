import { SkillNames } from '../abilities';
import { LanguageNames } from '../common';
import RaceBuilder from './RaceBuilder';
import { DragonbornAncestryDamage, DragonbornAncestryTypes } from './types';

export { default as RaceBuilder } from './RaceBuilder';
export * from './types';

export const ElfBuilder = new RaceBuilder({ name: 'elf' })
  .withAbilityBonuses({
    dexterity: 2,
  })
  .withProficiencies('perception')
  .withAlignments('cg', 'cn', 'ce')
  .withLanguages('common', 'elvish')
  .withTraits('fey-ancestry', 'trance');

export const HalflingBuilder = new RaceBuilder({
  name: 'halfling',
  size: 'sm',
  speed: 25,
})
  .withAbilityBonuses({
    dexterity: 2,
  })
  .withSavingThrows({ frightened: 'advantage' })
  .withAlignments('lg')
  .withLanguages('common', 'halfling')
  .withTraits('halfling-nimbleness', 'lucky');

export const HumanBuilder = new RaceBuilder({
  name: 'human',
  darkVision: 0,
})
  .withAbilityBonuses({
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1,
  })
  .withLanguages('common')
  .withLanguageSelectors({
    n: 1,
    of: LanguageNames.filter((current) => current !== 'common'),
  });

export const DwarfBuilder = new RaceBuilder({
  name: 'dwarf',
  speed: 25,
})
  .withAbilityBonuses({
    constitution: 2,
  })
  .withAlignments('lg', 'ng', 'ln')
  .withLanguages('common', 'dwarvish')
  .withDamageResistances({
    type: 'poison',
    resistance: 'resist',
  })
  .withSavingThrows({
    poison: 'advantage',
  })
  .withProficiencies('battleaxe', 'handaxe', 'light-hammer', 'warhammer')
  .withProficiencySelectors({
    n: 1,
    of: ['smith-tools', 'brewer-supplies', 'mason-tools'],
  })
  .withTraits('stonecunning');

export const HalfElfBuilder = new RaceBuilder({
  name: 'half-elf',
})
  .withAbilityBonuses({
    charisma: 2,
  })
  .withAbilityBonusSelectors({
    n: 2,
    of: [
      {
        ability: 'strength',
        bonus: 1,
      },
      {
        ability: 'dexterity',
        bonus: 1,
      },
      {
        ability: 'constitution',
        bonus: 1,
      },
      {
        ability: 'intelligence',
        bonus: 1,
      },
      {
        ability: 'wisdom',
        bonus: 1,
      },
    ],
  })
  .withAlignments('cg', 'cn', 'ce')
  .withProficiencySelectors({
    n: 2,
    of: [...SkillNames],
  })
  .withLanguages('common', 'elvish')
  .withLanguageSelectors({
    n: 1,
    of: LanguageNames.filter(
      (current) => !['common', 'elvish'].includes(current)
    ),
  })
  .withTraits('fey-ancestry');

export const HalfOrcBuilder = new RaceBuilder({ name: 'half-orc' })
  .withAbilityBonuses({
    strength: 2,
    constitution: 1,
  })
  .withAlignments('ce', 'cn')
  .withProficiencies('intimidation')
  .withLanguages('common', 'orc')
  .withTraits('savage-attacks', 'relentless-endurance');

export const GnomeBuilder = new RaceBuilder({
  name: 'gnome',
  speed: 25,
  size: 'sm',
})
  .withAbilityBonuses({
    intelligence: 2,
  })
  .withAlignments('lg', 'ng', 'cg')
  .withLanguages('common', 'gnomish')
  .withTraits('gnome-cunning');

export const TieflingBuilder = new RaceBuilder({ name: 'tiefling' })
  .withAbilityBonuses({ intelligence: 1, charisma: 2 })
  .withAlignments('ce', 'cn', 'ne', 'le')
  .withLanguages('common', 'infernal')
  .withDamageResistances({ type: 'fire', resistance: 'resist' })
  .withTraits('infernal-legacy');

export const DragonbornBuilder = new RaceBuilder({
  name: 'dragonborn',
  darkVision: 0,
})
  .withAbilityBonuses({
    strength: 2,
    charisma: 1,
  })
  .withAlignments('lg', 'ng', 'cg', 'le', 'ne', 'ce')
  .withLanguages('common', 'draconic')
  .withFragmentSelectors({
    n: 1,
    of: DragonbornAncestryTypes.map((type) => ({
      damageResistances: {
        [DragonbornAncestryDamage[type]]: 'resist',
      },
      traits: [`draconic ancestry ${type}`, `breath weapon ${type}`],
    })),
  });

export const BaseRaceBuilders = [
  ElfBuilder,
  HalflingBuilder,
  HumanBuilder,
  DwarfBuilder,
  HalfElfBuilder,
  HalfOrcBuilder,
  GnomeBuilder,
  TieflingBuilder,
  DragonbornBuilder,
];
