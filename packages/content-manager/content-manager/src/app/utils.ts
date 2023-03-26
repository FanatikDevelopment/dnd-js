import { ItemType } from '@dnd-js/core';
import axios from 'axios';
import { LoaderFunctionArgs } from 'react-router-dom';
import { ApiItem, ApiItemCategory } from './types';

export function itemTypeToApi(type: ItemType): string[] {
  switch (type) {
    case 'ammunition':
    case 'armor':
    case 'druidic-foci':
    case 'arcane-foci':
    case 'potion':
    case 'ring':
    case 'rod':
    case 'scroll':
    case 'staff':
    case 'standard-gear':
    case 'tool':
    case 'wand':
    case 'weapon':
      return [type];

    case 'equipment-pack':
    case 'gaming-set':
    case 'holy-symbol':
    case 'kit':
    case 'musical-instrument':
    case 'other-tool':
    case 'shield':
    case 'wondrous-item':
      return [type + 's'];

    case 'vehicle':
      return [
        'mounts-and-vehicles',
        'land-vehicles',
        'tack-harness-and-drawn-vehicles',
        'waterborne-vehicles',
      ];

    case 'animal':
      return ['mounts-and-other-animals'];

    case 'artisan-tools':
      return ['artisans-tools'];

    default:
      console.log(type);
      return [];
  }
}

export async function itemTypeLoader({ params }: LoaderFunctionArgs) {
  const baseUrl = `https://www.dnd5eapi.co`;
  const endpoints = await Promise.all(
    itemTypeToApi(params.category as ItemType).map((current) =>
      axios
        .get<ApiItemCategory>(baseUrl + '/api/equipment-categories/' + current)
        .then((result) => result.data.equipment.map((item) => item.url))
    )
  );
  const items = await Promise.all(
    endpoints.map((current) => axios.get<ApiItem>(baseUrl + current))
  );

  return { items };
}
