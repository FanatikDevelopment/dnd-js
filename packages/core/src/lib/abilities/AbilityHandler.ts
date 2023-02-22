import Pipeline from '../common/Pipeline';
import { MiddleWare } from '../common/types';
import { AbilityApi, AbilityCheckOptions, AbilityBonus } from './types';

/**
 * The AbilityHandler class is a pipeline system that allow the user to
 * alter the ability calculus so that bonuses can be applied
 */
export default class AbilityHandler implements AbilityApi {
  public readonly pipeline: Pipeline<AbilityBonus>;

  /**
   * Create an Ability handler from an IAbility handler
   * @param param0
   */
  constructor(mw?: MiddleWare<AbilityBonus>) {
    this.pipeline = new Pipeline<AbilityBonus>(mw);
  }

  value(ability: number): number {
    let result = ability;
    this.pipeline.visit((current) => {
      result = current.api.value ? current.api.value(result) : ability;
    });

    return result;
  }

  check(options: AbilityCheckOptions): number {
    let result = options.check;
    this.pipeline.visit((current) => {
      result = current.api.check ? current.api.check(options) : result;
    });

    return result;
  }

  modifier(mod: number): number {
    let result = mod;
    this.pipeline.visit((current) => {
      result = current.api.modifier ? current.api.modifier(result) : result;
    });

    return result;
  }
}
