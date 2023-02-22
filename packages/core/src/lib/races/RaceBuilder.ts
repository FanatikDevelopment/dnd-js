import { Abilities, AbilityName, AbilityNames } from '../abilities/types';
import { NOf } from '../common/types';
import { AlignmentShort, ProficiencyName, Race, SizeShort } from './types';

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
        alignments: [],
        abilityBonuses: {},
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

  get languages(): string[] {
    this.result.languages = this.result.languages ?? [...this.base.languages];
    return this.result.languages;
  }

  set languages(langs: string[]) {
    this.result.languages = langs;
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

  withLanguages(...langs: string[]): this {
    this.languages.push(...langs);
    return this;
  }

  withoutLanguages(...langs: string[]): this {
    this.languages = this.languages.filter((lang) => !langs.includes(lang));
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
      if (!abilities[ability]) {
        continue;
      } else if (bonuses[ability]) {
        bonuses[ability]! += abilities[ability]!;
      } else {
        bonuses[ability] = abilities[ability];
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

  withProficiencySelector(...selectors: NOf<ProficiencyName>[]): this {
    this.proficiencySelectors.push(...selectors);
    return this;
  }

  withoutProficiencySelector(...selectors: NOf<ProficiencyName>[]): this {
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
