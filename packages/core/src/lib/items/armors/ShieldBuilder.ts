import ItemBuilder from '../ItemBuilder';
import { Shield } from './types';

export type ShieldBuilderOptions<T = unknown> = Omit<
  Pick<Shield<T>, 'name'> & Partial<Shield<T>>,
  'itemType'
>;

export default class ShieldBuilder<T = unknown> extends ItemBuilder<T> {
  public override readonly base: Shield<T>;

  protected override result: Partial<Shield<T>>;

  constructor(options: ShieldBuilderOptions<T>) {
    super({ ...options, itemType: 'shield' });
    this.base = Object.assign<
      Partial<Shield<T>>,
      Partial<Shield<T>>,
      Partial<Shield<T>>
    >(
      {
        armorClassBonus: 2,
      },
      super.base,
      options
    ) as Shield<T>;

    this.result = {};
  }

  get armorClassBonus(): number {
    this.result.armorClassBonus =
      this.result.armorClassBonus ?? this.base.armorClassBonus;

    return this.result.armorClassBonus;
  }

  set armorClassBonus(value: number) {
    this.armorClassBonus = value;
  }

  override build(): Shield<T> {
    return Object.assign({}, this.base, this.result) as Shield<T>;
  }
}
