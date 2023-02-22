import { DamageType } from '../health/type';

export interface Item<T = unknown> {
  name: string;
  cost: number;
  weight: number;
  description?: string;
  extra?: T;
}
