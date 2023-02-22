import { Abilities, AbilityBonus, AbilityName } from './types';
import AbilityHandler from './AbilityHandler';
import { abilityCheck, abilityModifier } from './utils';
import { d20 } from '../utils';
import { Dice } from '@dnd-js/dice';
import Pipeline from '../common/Pipeline';
import { MiddleWare } from '../common/types';

export default class AbilityManager {
  private rawAbilities: Abilities;

  private handlers: Abilities<AbilityHandler>;

  constructor(
    abilities: Abilities,
    handlers?: Partial<Abilities<MiddleWare<AbilityBonus>>>
  ) {
    this.rawAbilities = abilities;

    this.handlers = {
      strength: new AbilityHandler(handlers?.strength),
      dexterity: new AbilityHandler(handlers?.dexterity),
      constitution: new AbilityHandler(handlers?.constitution),
      intelligence: new AbilityHandler(handlers?.intelligence),
      wisdom: new AbilityHandler(handlers?.wisdom),
      charisma: new AbilityHandler(handlers?.charisma),
    };
  }

  get strength(): number {
    return this.handlers.strength.value(this.rawAbilities.strength);
  }

  get strengthModifier(): number {
    return this.handlers.strength.modifier(
      abilityModifier(this.rawAbilities.strength)
    );
  }

  get dexterity(): number {
    return this.handlers.dexterity.value(this.rawAbilities.dexterity);
  }

  get dexterityModifier(): number {
    return this.handlers.dexterity.modifier(
      abilityModifier(this.rawAbilities.dexterity)
    );
  }

  get constitution(): number {
    return this.handlers.constitution.value(this.rawAbilities.constitution);
  }

  get constitutionModifier(): number {
    return this.handlers.constitution.modifier(
      abilityModifier(this.rawAbilities.constitution)
    );
  }

  get intelligence(): number {
    return this.handlers.intelligence.value(this.rawAbilities.intelligence);
  }

  get intelligenceModifier(): number {
    return this.handlers.intelligence.modifier(
      abilityModifier(this.rawAbilities.intelligence)
    );
  }

  get wisdom(): number {
    return this.handlers.wisdom.value(this.rawAbilities.wisdom);
  }

  get wisdomModifier(): number {
    return this.handlers.wisdom.modifier(
      abilityModifier(this.rawAbilities.wisdom)
    );
  }

  get charisma(): number {
    return this.handlers.charisma.value(this.rawAbilities.charisma);
  }

  get charismaModifier(): number {
    return this.handlers.charisma.modifier(
      abilityModifier(this.rawAbilities.charisma)
    );
  }

  bonuses(ability: AbilityName): Pipeline<AbilityBonus> {
    return this.handlers[ability].pipeline;
  }

  get rawStrength(): number {
    return this.rawAbilities.strength;
  }

  set rawStrength(value: number) {
    this.rawAbilities.strength = value;
  }

  get rawDexterity(): number {
    return this.rawAbilities.dexterity;
  }

  set rawDexterity(value: number) {
    this.rawAbilities.dexterity = value;
  }

  get rawConstitution(): number {
    return this.rawAbilities.constitution;
  }

  set rawConstitution(value: number) {
    this.rawAbilities.constitution = value;
  }

  get rawIntelligence(): number {
    return this.rawAbilities.intelligence;
  }

  set rawIntelligence(value: number) {
    this.rawAbilities.intelligence = value;
  }

  get rawWisdom(): number {
    return this.rawAbilities.wisdom;
  }

  set rawWisdom(value: number) {
    this.rawAbilities.wisdom = value;
  }

  get rawCharisma(): number {
    return this.rawAbilities.charisma;
  }

  set rawCharisma(value: number) {
    this.rawAbilities.charisma = value;
  }

  raw(ability: AbilityName): number {
    return this.rawAbilities[ability];
  }

  value(ability: AbilityName): number {
    return this[ability];
  }

  modifier(ability: AbilityName): number {
    return this.handlers[ability].modifier(abilityModifier(this[ability]));
  }

  check(ability: AbilityName, d: Dice = d20) {
    return this.handlers[ability].check({
      check: abilityCheck(this[ability], d),
      ability: this[ability],
      modifier: this.handlers[ability].modifier(abilityModifier(this[ability])),
      rawAbility: this.rawAbilities[ability],
      dice: d,
    });
  }
}
