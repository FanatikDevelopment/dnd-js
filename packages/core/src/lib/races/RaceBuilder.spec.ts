import RaceBuilder from './RaceBuilder';

describe('RaceBuilder', () => {
  const builder1 = new RaceBuilder({ name: 'test1' });
  const builder2 = new RaceBuilder({
    name: 'test2',
    speed: 24,
    size: 'sm',
    darkVision: 0,
    languages: ['common'],
    alignments: ['lg', 'ln', 'le', 'ng', 'n', 'ne'],
    abilityBonuses: {
      strength: 1,
      dexterity: 2,
      constitution: 3,
      intelligence: -2,
    },
    proficiencies: ['dagger'],
    proficiencySelectors: [
      {
        n: 1,
        of: ['shortsword', 'longsword'],
      },
    ],
    traits: ['feat-1'],
  });

  beforeEach(() => {
    builder1.reset();
    builder2.reset();
  });

  it('should have default common props', () => {
    expect(() => new RaceBuilder({ name: '' })).toThrow();
    expect(builder1.name).toBe('test1');
    expect(builder1.speed).toBe(30);
    expect(builder1.size).toBe('md');
    expect(builder1.darkVision).toBe(60);
    expect(builder1.languages).toEqual([]);
    expect(builder1.alignments).toEqual([]);
    expect(builder1.abilityBonuses).toEqual({});
    expect(builder1.proficiencies).toEqual([]);
    expect(builder1.proficiencySelectors).toEqual([]);
    expect(builder1.traits).toEqual([]);

    expect(builder2.name).toBe('test2');
    expect(builder2.speed).toBe(24);
    expect(builder2.size).toBe('sm');
    expect(builder2.darkVision).toBe(0);
    expect(builder2.languages).toEqual(['common']);
    expect(builder2.alignments).toEqual(['lg', 'ln', 'le', 'ng', 'n', 'ne']);
    expect(builder2.abilityBonuses).toEqual({
      strength: 1,
      dexterity: 2,
      constitution: 3,
      intelligence: -2,
    });
    expect(builder2.proficiencies).toEqual(['dagger']);
    expect(builder2.proficiencySelectors).toEqual([
      {
        n: 1,
        of: ['shortsword', 'longsword'],
      },
    ]);
    expect(builder2.traits).toEqual(['feat-1']);
  });

  it('should support atomic fields manipulation', () => {
    builder1.name = 'test3';
    expect(builder1.name).toBe('test3');
    builder1.name = '';
    expect(builder1.name).toBe('test1');
    builder1.speed = 15;
    expect(builder1.speed).toBe(15);
    builder1.speed = 0;
    expect(builder1.speed).toBe(0);
    expect(builder1.size).toBe('md');
    builder1.darkVision = 30;
    expect(builder1.darkVision).toBe(30);
    builder1.darkVision = 0;
    expect(builder1.darkVision).toBe(0);
  });

  it('should support non-atomic fields manipulation', () => {
    builder2.withLanguages('abyssal', 'elf');
    expect(builder2.languages).toEqual(['common', 'abyssal', 'elf']);
    builder2.withoutLanguages('common', 'elf');
    expect(builder2.languages).toEqual(['abyssal']);

    builder2
      .withAlignments('cg', 'cn', 'ce')
      .withoutAlignments('lg', 'ln', 'le');
    expect(builder2.alignments).toEqual(['ng', 'n', 'ne', 'cg', 'cn', 'ce']);

    builder2
      .withAbilityBonuses({
        strength: 2,
        dexterity: -3,
        charisma: 1,
      })
      .withoutAbilityBonuses('constitution', 'wisdom');
    expect(builder2.abilityBonuses).toEqual({
      strength: 3,
      dexterity: -1,
      intelligence: -2,
      charisma: 1,
    });
    builder2.withProficiencies('battleaxe').withoutProficiencies('dagger');
    expect(builder2.proficiencies).toEqual(['battleaxe']);

    const selector = builder2.proficiencySelectors.filter((current) =>
      current.of.includes('longsword')
    );
    builder2.withoutProficiencySelector(...selector).withProficiencySelector({
      n: 1,
      of: ['shortsword', 'longsword', 'greatsword'],
    });
    expect(builder2.proficiencySelectors).toEqual([
      {
        n: 1,
        of: ['shortsword', 'longsword', 'greatsword'],
      },
    ]);
  });

  it('should build the race', () => {
    const original = builder1.build();
    expect(original.name).toBe('test1');
    expect(original.speed).toBe(30);
    expect(original.size).toBe('md');
    expect(original.darkVision).toBe(60);
    expect(original.languages).toEqual([]);
    expect(original.alignments).toEqual([]);
    expect(original.abilityBonuses).toEqual({});
    expect(original.proficiencies).toEqual([]);
    expect(original.proficiencySelectors).toEqual([]);
    expect(original.traits).toEqual([]);

    builder1
      .withName('sub-test1')
      .withSpeed(100)
      .withDarkVision(80)
      .withSize('lg')
      .withLanguages('demonic')
      .withAlignments('ce', 'ne', 'le')
      .withAbilityBonuses({ dexterity: 2 })
      .withTraits('feat-1')
      .withProficiencies('alchemist-supplies')
      .withProficiencySelector({
        n: 2,
        of: ['calligrapher-supplies', 'brewer-supplies', 'cartographer-tools'],
      });

    const result = builder1.build();
    expect(result.name).toBe('sub-test1');
    expect(result.speed).toBe(100);
    expect(result.size).toBe('lg');
    expect(result.darkVision).toBe(80);
    expect(result.languages).toEqual(['demonic']);
    expect(result.alignments).toEqual(['ce', 'ne', 'le']);
    expect(result.abilityBonuses).toEqual({ dexterity: 2 });
    expect(result.proficiencies).toEqual(['alchemist-supplies']);
    expect(result.proficiencySelectors).toEqual([
      {
        n: 2,
        of: ['calligrapher-supplies', 'brewer-supplies', 'cartographer-tools'],
      },
    ]);
    expect(result.traits).toEqual(['feat-1']);

    builder1.reset();
    expect(builder1.build()).toEqual(original);
  });
});
