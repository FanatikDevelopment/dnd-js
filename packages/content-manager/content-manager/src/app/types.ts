export type ApiResource = {
  index: string;
  name: string;
  url: string;
};

export type ApiItemCategory = ApiResource & {
  equipment: ApiResource[];
};

export type ApiItemCategoryList = {
  count: number;
  results: ApiResource[];
};

export type ApiItemBase = ApiResource & {
  desc: string[];
  equipment_category: ApiResource;
  cost?: {
    quantity: number;
    unit: string;
  };
  weight?: number;
};

export type ApiWeapon = ApiItemBase & {
  weapon_category: string;
  weapon_range: string;
  category_range: string;
  range: {
    normal: number;
    long: number;
  };
  damage: {
    damage_dice: string;
    damage_type: ApiResource;
  };
  two_handed_damage: {
    damage_dice: string;
    damage_type: ApiResource;
  };
  properties: ApiResource[];
};

export type ApiArmor = ApiItemBase & {
  armor_category: string;
  armor_class: {
    [key: string]: string;
  };
  str_minimum: number;
  stealth_disadvantage: boolean;
};

export type ApiGear = ApiItemBase & {
  gear_category: ApiResource;
  special: string[];
};

export type ApiItem = ApiItemBase & Partial<ApiWeapon & ApiArmor & ApiGear>;
