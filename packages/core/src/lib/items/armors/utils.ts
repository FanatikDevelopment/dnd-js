import { ArmorCategoryName } from './types';

export function armorUsesDexBonus(category: ArmorCategoryName): boolean {
  return category !== 'heavy';
}

export function getArmorMaxDexBonus(
  category: ArmorCategoryName
): number | undefined {
  return category === 'medium' ? 2 : undefined;
}

export function armorHasStealthDisadvantage(
  category: ArmorCategoryName
): boolean {
  return category === 'heavy';
}
