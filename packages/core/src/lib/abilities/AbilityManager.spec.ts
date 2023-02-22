import { DiceRoll } from '@dnd-js/dice';
import { d20 } from '../utils';
import AbilityManager from './AbilityManager';
import { AbilityCheckOptions } from './types';
import { abilityCheck, abilityModifier } from './utils';

describe('AbilityManager', () => {
  describe('handlers root', () => {
    it('should have default handlers for each ability', () => {
      const mgr = new AbilityManager(
        {
          strength: 10,
          dexterity: 11,
          constitution: 12,
          intelligence: 14,
          wisdom: 16,
          charisma: 18,
        },
        {
          strength: {
            api: { id: 'STR +2', value: (val: number) => val + 2 },
            next: {
              api: {
                id: 'STR >=25',
                value: (val) => (val < 25 ? 25 : val),
                modifier: (mod) => mod + 2,
              },
            },
          },
          dexterity: {
            api: {
              id: 'DEX nofail',
              check: (options: AbilityCheckOptions) =>
                [1, 20].includes(options.check)
                  ? options.check
                  : Math.max(10 + options.modifier, options.check),
            },
          },
        }
      );
    });
  });

  describe('no handlers', () => {
    const mgr = new AbilityManager({
      strength: 10,
      dexterity: 11,
      constitution: 12,
      intelligence: 14,
      wisdom: 16,
      charisma: 18,
    });

    it('should return the raw values', () => {
      expect(mgr.strength).toBe(mgr.rawStrength);
      expect(mgr.dexterity).toBe(mgr.rawDexterity);
      expect(mgr.constitution).toBe(mgr.rawConstitution);
      expect(mgr.intelligence).toBe(mgr.rawIntelligence);
      expect(mgr.wisdom).toBe(mgr.rawWisdom);
      expect(mgr.charisma).toBe(mgr.rawCharisma);

      mgr.rawStrength += 2;
      mgr.rawDexterity += 2;
      mgr.rawConstitution += 2;
      mgr.rawIntelligence += 2;
      mgr.rawWisdom += 2;
      mgr.rawCharisma += 2;

      expect(mgr.strength).toBe(mgr.rawStrength);
      expect(mgr.dexterity).toBe(mgr.rawDexterity);
      expect(mgr.constitution).toBe(mgr.rawConstitution);
      expect(mgr.intelligence).toBe(mgr.rawIntelligence);
      expect(mgr.wisdom).toBe(mgr.rawWisdom);
      expect(mgr.charisma).toBe(mgr.rawCharisma);
    });

    it('should return the raw modifiers', () => {
      expect(mgr.strengthModifier).toBe(abilityModifier(mgr.rawStrength));
      expect(mgr.dexterityModifier).toBe(abilityModifier(mgr.rawDexterity));
      expect(mgr.constitutionModifier).toBe(
        abilityModifier(mgr.rawConstitution)
      );
      expect(mgr.intelligenceModifier).toBe(
        abilityModifier(mgr.rawIntelligence)
      );
      expect(mgr.wisdomModifier).toBe(abilityModifier(mgr.rawWisdom));
      expect(mgr.charismaModifier).toBe(abilityModifier(mgr.rawCharisma));

      mgr.rawStrength -= 2;
      mgr.rawDexterity -= 2;
      mgr.rawConstitution -= 2;
      mgr.rawIntelligence -= 2;
      mgr.rawWisdom -= 2;
      mgr.rawCharisma -= 2;

      expect(mgr.strength).toBe(mgr.rawStrength);
      expect(mgr.dexterity).toBe(mgr.rawDexterity);
      expect(mgr.constitution).toBe(mgr.rawConstitution);
      expect(mgr.intelligence).toBe(mgr.rawIntelligence);
      expect(mgr.wisdom).toBe(mgr.rawWisdom);
      expect(mgr.charisma).toBe(mgr.rawCharisma);
    });

    it('should return the raw check', () => {
      const realRoll = d20.roll;
      d20.roll = jest.fn(
        (): DiceRoll => ({
          dice: d20,
          diceValues: [15],
          total: 15,
        })
      );

      expect(mgr.check('strength', d20)).toBe(abilityCheck(mgr.strength, d20));
      expect(mgr.check('dexterity')).toBe(abilityCheck(mgr.dexterity));
      d20.roll = realRoll;
    });
  });

  describe('with handlers', () => {
    let mgr: AbilityManager;
    beforeEach(() => {
      mgr = new AbilityManager(
        {
          strength: 10,
          dexterity: 11,
          constitution: 12,
          intelligence: 14,
          wisdom: 16,
          charisma: 18,
        },
        {
          strength: {
            api: { id: 'STR +2', value: (val) => val + 2 },
            next: {
              api: {
                id: 'STR >=25',
                value: (val) => (val < 25 ? 25 : val),
                modifier: (mod) => mod + 2,
              },
            },
          },
          dexterity: {
            api: {
              id: 'DEX nofail',
              check: (options: AbilityCheckOptions) =>
                [1, 20].includes(options.check)
                  ? options.check
                  : Math.max(10 + options.modifier, options.check),
            },
          },
        }
      );
    });
    it('should return the raw values', () => {
      expect(mgr.strength).toBe(25);

      expect(mgr.strengthModifier).toBe(abilityModifier(mgr.rawStrength) + 2);
      expect(mgr.dexterityModifier).toBe(abilityModifier(mgr.rawDexterity));
      expect(mgr.constitutionModifier).toBe(
        abilityModifier(mgr.rawConstitution)
      );
      expect(mgr.intelligenceModifier).toBe(
        abilityModifier(mgr.rawIntelligence)
      );
      expect(mgr.wisdomModifier).toBe(abilityModifier(mgr.rawWisdom));
      expect(mgr.charismaModifier).toBe(abilityModifier(mgr.rawCharisma));

      const realRoll = d20.roll;
      d20.roll = jest.fn(
        (): DiceRoll => ({
          dice: d20,
          diceValues: [15],
          total: 15,
        })
      );

      expect(mgr.check('strength', d20)).toBe(abilityCheck(mgr.strength, d20));
      d20.roll = realRoll;
    });
  });

  describe('handlers manipulation', () => {
    let mgr: AbilityManager;
    beforeEach(() => {
      mgr = new AbilityManager(
        {
          strength: 10,
          dexterity: 11,
          constitution: 12,
          intelligence: 14,
          wisdom: 16,
          charisma: 18,
        },
        {
          strength: {
            api: { id: 'STR +2', value: (val) => val + 2 },
            next: {
              api: {
                id: 'STR >=25',
                value: (val) => (val < 25 ? 25 : val),
                modifier: (mod) => mod + 2,
              },
            },
          },
          dexterity: {
            api: {
              id: 'DEX nofail',
              check: (options: AbilityCheckOptions) =>
                [1, 20].includes(options.check)
                  ? options.check
                  : Math.max(10 + options.modifier, options.check),
            },
          },
        }
      );
    });

    it('should support adding handlers', () => {
      expect(mgr.bonuses('constitution').root).toBeUndefined();
      expect(mgr.constitution).toBe(mgr.rawConstitution);
      mgr
        .bonuses('constitution')
        .pipe({ api: { id: 'CON -1', value: (val: number) => val - 1 } });
      expect(mgr.bonuses('constitution').root).toBeDefined();
      expect(mgr.constitution).toBe(mgr.rawConstitution - 1);

      expect(mgr.strength).toBe(25);
      mgr
        .bonuses('strength')
        .pipe({ api: { id: 'STR -5', value: (val) => val - 5 } });
      expect(mgr.strength).toBe(20);

      mgr.rawStrength = 26;
      expect(mgr.strength).toBe(23);
      mgr
        .bonuses('strength')
        .pipe({ api: { id: 'STR +8', value: (val) => val + 8 } });
      expect(mgr.strength).toBe(31);
    });

    it('should support removing handlers', () => {
      mgr.bonuses('dexterity').pipe({
        api: {
          id: 'DEX -1',
          value: (val: number) => val - 1,
        },
      });
      mgr
        .bonuses('strength')
        .pipe({ api: { id: 'STR -5', value: (val) => val - 5 } });
      mgr
        .bonuses('strength')
        .pipe({ api: { id: 'STR +8', value: (val) => val + 8 } });

      mgr.bonuses('strength').filter((h) => h.api.id === 'STR +8');
      expect(mgr.bonuses('strength').root?.api.id).toBe('STR +8');
      expect(mgr.bonuses('strength').root?.next).toBeUndefined();

      expect(mgr.bonuses('dexterity').root?.api.id).toBe('DEX nofail');
      expect(mgr.bonuses('dexterity').root?.next?.api.id).toBe('DEX -1');
      const unpiped = mgr
        .bonuses('dexterity')
        .unpipe((mw) => mw.api.id === 'DEX -1');
      expect(unpiped).toBeDefined();
      mgr.bonuses('dexterity').pipe(unpiped!);
      expect(mgr.bonuses('dexterity').last?.api.id).toBe('DEX -1');
    });
  });
});
