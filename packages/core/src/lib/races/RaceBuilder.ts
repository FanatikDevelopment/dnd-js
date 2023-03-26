import { Abilities, AbilityName, AbilityNames } from '../abilities/types';
import {
  NOf,
  AlignmentShort,
  ProficiencyName,
  SizeShort,
  LanguageName,
  DamageResistanceBonus,
  AbilityBonus,
  SavingThrows,
  SavingThrowBonus,
  SavingThrowType,
} from '../common/types';
import {
  DamageResistances,
  DamageResistanceType,
  DamageType,
} from '../health/types';
import { Race } from './types';

export default class RaceBuilder {
  public readonly base: Race;

  private result: Partial<Race>;

  constructor(props: Partial<Race> & { name: string }) {
    if (!props.name) {
      throw new Error('Race builder must have a name');
    }

    this.base = Object.assign<Partial<Race>, Partial<Race>>(
      {
        speed: 30,
        size: 'md',
        darkVision: 60,
        languages: [],
        languageSelectors: [],
        alignments: [],
        abilityBonuses: {},
        abilityBonusSelectors: [],
        damageResistances: {},
        damageResistanceSelectors: [],
        savingThrows: {},
        savingThrowSelectors: [],
        proficiencies: [],
        proficiencySelectors: [],
        traits: [],
      },
      props
    ) as Race;

    this.result = {};
  }

  reset() {
    this.result = {};
  }

  get name(): string {
    return this.result.name || this.base.name;
  }

  set name(value: string) {
    this.result.name = value || this.base.name;
  }

  get speed(): number {
    return this.result.speed ?? this.base.speed;
  }

  set speed(value: number) {
    this.result.speed = value;
  }

  get size(): SizeShort {
    return this.result.size || this.base.size;
  }

  set size(value: SizeShort) {
    this.result.size = value;
  }

  get darkVision(): number {
    return this.result.darkVision ?? this.base.darkVision;
  }

  set darkVision(value: number) {
    this.result.darkVision = value;
  }

  get savingThrows(): Partial<SavingThrows> {
    this.result.savingThrows = this.result.savingThrows ?? {
      ...this.base.savingThrows,
    };
    return this.result.savingThrows;
  }

  set savingThrows(savingThrows: Partial<SavingThrows>) {
    this.result.savingThrows = savingThrows;
  }

  get savingThrowSelectors(): NOf<SavingThrowBonus>[] {
    this.result.savingThrowSelectors = this.result.savingThrowSelectors ?? [
      ...this.base.savingThrowSelectors,
    ];
    return this.result.savingThrowSelectors;
  }

  set savingThrowSelectors(selectors: NOf<SavingThrowBonus>[]) {
    this.result.savingThrowSelectors = selectors;
  }

  get languages(): LanguageName[] {
    this.result.languages = this.result.languages ?? [...this.base.languages];
    return this.result.languages;
  }

  set languages(langs: LanguageName[]) {
    this.result.languages = langs;
  }

  get languageSelectors(): NOf<LanguageName>[] {
    this.result.languageSelectors = this.result.languageSelectors ?? [
      ...this.base.languageSelectors,
    ];
    return this.result.languageSelectors;
  }

  set languageSelectors(selectors: NOf<LanguageName>[]) {
    this.result.languageSelectors = selectors;
  }

  get alignments(): AlignmentShort[] {
    this.result.alignments = this.result.alignments ?? [
      ...this.base.alignments,
    ];
    return this.result.alignments;
  }

  set alignments(alignments: AlignmentShort[]) {
    this.result.alignments = alignments;
  }

  get abilityBonuses(): Partial<Abilities> {
    this.result.abilityBonuses = this.result.abilityBonuses ?? {
      ...this.base.abilityBonuses,
    };
    return this.result.abilityBonuses;
  }

  set abilityBonuses(abilityBonuses: Partial<Abilities>) {
    this.result.abilityBonuses = abilityBonuses;
  }

  get abilityBonusSelectors(): NOf<AbilityBonus>[] {
    this.result.abilityBonusSelectors =
      this.result.abilityBonusSelectors ?? this.base.abilityBonusSelectors;
    return this.result.abilityBonusSelectors;
  }

  set abilityBonusSelectors(props: NOf<AbilityBonus>[]) {
    this.result.abilityBonusSelectors = props;
  }

  get damageResistances(): Partial<DamageResistances> {
    this.result.damageResistances = this.result.damageResistances ?? {
      ...this.base.damageResistances,
    };
    return this.result.damageResistances;
  }

  set damageResistances(value: Partial<DamageResistances>) {
    this.result.damageResistances = value;
  }

  get damageResistanceSelectors(): NOf<DamageResistanceBonus>[] {
    this.result.damageResistanceSelectors = this.result
      .damageResistanceSelectors ?? {
      ...this.base.damageResistanceSelectors,
    };
    return this.damageResistanceSelectors;
  }

  set damageResistanceSelectors(value: NOf<DamageResistanceBonus>[]) {
    this.result.damageResistanceSelectors = value;
  }

  get proficiencies(): ProficiencyName[] {
    this.result.proficiencies =
      this.result.proficiencies ?? this.base.proficiencies;
    return this.result.proficiencies;
  }

  set proficiencies(props: ProficiencyName[]) {
    this.result.proficiencies = props;
  }

  get proficiencySelectors(): NOf<ProficiencyName>[] {
    this.result.proficiencySelectors =
      this.result.proficiencySelectors ?? this.base.proficiencySelectors;
    return this.result.proficiencySelectors;
  }

  set proficiencySelectors(props: NOf<ProficiencyName>[]) {
    this.result.proficiencySelectors = props;
  }

  get traits(): string[] {
    this.result.traits = this.result.traits?.length
      ? this.result.traits
      : [...this.base.traits];
    return this.result.traits;
  }

  set traits(traits: string[]) {
    this.result.traits = traits;
  }

  withName(name: string): this {
    this.name = name;
    return this;
  }

  withSpeed(speed: number): this {
    this.speed = speed;
    return this;
  }

  withSize(size: SizeShort): this {
    this.size = size;
    return this;
  }

  withDarkVision(darkVision: number): this {
    this.darkVision = darkVision;
    return this;
  }

  withLanguages(...langs: LanguageName[]): this {
    this.languages.push(...langs);
    return this;
  }

  withoutLanguages(...langs: LanguageName[]): this {
    this.languages = this.languages.filter((lang) => !langs.includes(lang));
    return this;
  }

  withLanguageSelectors(...selectors: NOf<LanguageName>[]): this {
    this.languageSelectors.push(...selectors);
    return this;
  }

  withoutLanguageSelectors(...selectors: NOf<LanguageName>[]): this {
    this.languageSelectors = this.languageSelectors.filter(
      (current) => !selectors.includes(current)
    );
    return this;
  }

  withDamageResistances(
    resistances: Partial<{
      type: DamageType;
      resistance: DamageResistanceType;
    }>
  ): this {
    Object.assign(this.damageResistances, resistances);
    return this;
  }

  withoutDamageResistances(...resistances: DamageType[]): this {
    Object.fromEntries(
      Object.entries(resistances).filter(
        ([key]) => !resistances.includes(key as DamageType)
      )
    );
    return this;
  }

  withDamageResistanceSelectors(
    ...selectors: NOf<DamageResistanceBonus>[]
  ): this {
    this.damageResistanceSelectors.push(...selectors);
    return this;
  }

  withoutDamageResistanceSelectors(
    ...selectors: NOf<DamageResistanceBonus>[]
  ): this {
    this.damageResistanceSelectors = this.damageResistanceSelectors.filter(
      (current) => !selectors.includes(current)
    );
    return this;
  }

  withSavingThrows(savingThrows: Partial<SavingThrows>): this {
    Object.assign(this.savingThrows, savingThrows);
    return this;
  }

  withoutSavingThrows(...savingThrows: SavingThrowType[]): this {
    Object.fromEntries(
      Object.entries(savingThrows).filter(
        ([key]) => !savingThrows.includes(key as SavingThrowType)
      )
    );
    return this;
  }

  withSavingThrowSelectors(...selectors: NOf<SavingThrowBonus>[]): this {
    this.savingThrowSelectors.push(...selectors);
    return this;
  }

  withoutSavingThrowSelectors(...selectors: NOf<SavingThrowBonus>[]): this {
    this.savingThrowSelectors = this.savingThrowSelectors.filter(
      (current) => !selectors.includes(current)
    );
    return this;
  }

  withAlignments(...alignments: AlignmentShort[]): this {
    this.alignments.push(...alignments);
    return this;
  }

  withoutAlignments(...alignments: AlignmentShort[]): this {
    this.alignments = this.alignments.filter(
      (alignment) => !alignments.includes(alignment)
    );
    return this;
  }

  withAbilityBonuses(abilities: Partial<Abilities>): this {
    const bonuses = this.abilityBonuses;
    for (const ability of AbilityNames) {
      const current = bonuses[ability] ?? 0;
      const bonus = abilities[ability] ?? 0;
      if (!bonus) {
        continue;
      } else {
        bonuses[ability] = current + bonus;
      }
    }
    return this;
  }

  withoutAbilityBonuses(...abilities: AbilityName[]): this {
    const bonuses = this.abilityBonuses;
    for (const ability of abilities) {
      delete bonuses[ability];
    }
    return this;
  }

  withAbilityBonusSelectors(...selectors: NOf<AbilityBonus>[]): this {
    this.abilityBonusSelectors.push(...selectors);
    return this;
  }

  withoutAbilityBonusSelectors(...selectors: NOf<AbilityBonus>[]): this {
    this.abilityBonusSelectors = this.abilityBonusSelectors.filter(
      (current) => !selectors.includes(current)
    );
    return this;
  }

  withProficiencies(...proficiencies: ProficiencyName[]): this {
    this.proficiencies.push(...proficiencies);
    return this;
  }

  withoutProficiencies(...proficiencies: ProficiencyName[]): this {
    this.proficiencies = this.proficiencies.filter(
      (proficiency) => !proficiencies.includes(proficiency)
    );
    return this;
  }

  withProficiencySelectors(...selectors: NOf<ProficiencyName>[]): this {
    this.proficiencySelectors.push(...selectors);
    return this;
  }

  withoutProficiencySelectors(...selectors: NOf<ProficiencyName>[]): this {
    this.proficiencySelectors = this.proficiencySelectors.filter(
      (current) => !selectors.includes(current)
    );
    return this;
  }

  withTraits(...traits: string[]): this {
    this.traits.push(...traits);
    return this;
  }

  withoutTraits(...traits: string[]): this {
    this.traits = this.traits.filter((ft) => !traits.includes(ft));
    return this;
  }

  build(): Race {
    return Object.assign<Partial<Race>, Race, Partial<Race>>(
      {},
      this.base,
      this.result
    ) as Race;
  }
}
