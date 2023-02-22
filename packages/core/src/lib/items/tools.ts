import { Item } from './types';

/**
 * TODO ad musical instruments
 */

const ToolNames = [
  'alchemist-supplies',
  'brewer-supplies',
  'calligrapher-supplies',
  'carpenter-tools',
  'cartographer-tools',
  'cobbler-tools',
  'cook-utensils',
  'glassblower-tools',
  'jeweler-tools',
  'leatherworker-tools',
  'mason-tools',
  'painter-supplies',
  'potter-tools',
  'smith-tools',
  'tinker-tools',
  'weaver-tools',
  'woodcarver-tools',
  'disguise-kit',
  'forgery-kit',
  'dice-set',
  'dragonchess-set',
  'playing-card-set',
  'three-dragon-ante-set',
  'herbalism-kit',
  'navigator-tools',
  'poisoner-kit',
  'thieves-tools',
] as const;
type ToolNamesTuple = typeof ToolNames;
export type ToolName = ToolNamesTuple[number];

type ToolsType = {
  [key in ToolName]: Item;
};

export const tools: ToolsType = {
  'alchemist-supplies': {
    name: 'alchemist-supplies',
    cost: 50,
    weight: 1,
  },
  'brewer-supplies': {
    name: 'brewer-supplies',
    cost: 20,
    weight: 1,
  },
  'calligrapher-supplies': {
    name: 'calligrapher-supplies',
    cost: 10,
    weight: 1,
  },
  'carpenter-tools': {
    name: 'carpenter-tools',
    cost: 8,
    weight: 1,
  },
  'cartographer-tools': {
    name: 'cartographer-tools',
    cost: 15,
    weight: 1,
  },
  'cobbler-tools': {
    name: 'cobbler-tools',
    cost: 5,
    weight: 1,
  },
  'cook-utensils': {
    name: 'cook-utensils',
    cost: 1,
    weight: 1,
  },
  'glassblower-tools': {
    name: 'glassblower-tools',
    cost: 30,
    weight: 1,
  },
  'jeweler-tools': {
    name: 'jeweler-tools',
    cost: 25,
    weight: 1,
  },
  'leatherworker-tools': {
    name: 'leatherworker-tools',
    cost: 5,
    weight: 1,
  },
  'mason-tools': {
    name: 'mason-tools',
    cost: 10,
    weight: 1,
  },
  'painter-supplies': {
    name: 'painter-supplies',
    cost: 10,
    weight: 1,
  },
  'potter-tools': {
    name: 'potter-tools',
    cost: 10,
    weight: 1,
  },
  'smith-tools': {
    name: 'smith-tools',
    cost: 20,
    weight: 1,
  },
  'tinker-tools': {
    name: 'tinker-tools',
    cost: 50,
    weight: 1,
  },
  'weaver-tools': {
    name: 'weaver-tools',
    cost: 1,
    weight: 1,
  },
  'woodcarver-tools': {
    name: 'woodcarver-tools',
    cost: 1,
    weight: 1,
  },
  'disguise-kit': {
    name: 'disguise-kit',
    cost: 25,
    weight: 1,
  },
  'forgery-kit': {
    name: 'forgery-kit',
    cost: 15,
    weight: 1,
  },
  'dice-set': {
    name: 'dice-set',
    cost: 0.1,
    weight: 1,
  },
  'dragonchess-set': {
    name: 'dragonchess-set',
    cost: 1,
    weight: 1,
  },
  'playing-card-set': {
    name: 'playing-card-set',
    cost: 0.5,
    weight: 1,
  },
  'three-dragon-ante-set': {
    name: 'three-dragon-ante-set',
    cost: 1,
    weight: 1,
  },
  'herbalism-kit': {
    name: 'herbalism-kit',
    cost: 5,
    weight: 1,
  },
  'navigator-tools': {
    name: 'navigator-tools',
    cost: 25,
    weight: 1,
  },
  'poisoner-kit': {
    name: 'poisoner-kit',
    cost: 50,
    weight: 1,
  },
  'thieves-tools': {
    name: 'thieves-tools',
    cost: 25,
    weight: 1,
  },
};
