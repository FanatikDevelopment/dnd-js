import { ItemType } from '@dnd-js/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ApiResource } from '../types';
import Item from './Item';

type ApiItemCategory = ApiResource & {
  equipment: ApiResource[];
};

export default function ItemCategory({ name, url }: ApiResource) {
  const [items, setItems] = useState<any>();
  useEffect(() => {
    axios
      .get<ApiItemCategory>(`https://www.dnd5eapi.co${url}`)
      .then((results) => {
        setItems(results.data.equipment);
      });
  }, []);

  return (
    <div>
      <h3>{name}</h3>
      {items?.map((item: ApiItemCategory) => (
        <Item key={item.index} {...item} />
      ))}
    </div>
  );
}

export function ItemCategory2({ name }: { name: ItemType }) {
  const [items, setItems] = useState<any>();
  useEffect(() => {
    let apiCategory: string[] = [];
    switch (name) {
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
        apiCategory = [name];
        break;

      case 'equipment-pack':
      case 'gaming-set':
      case 'holy-symbol':
      case 'kit':
      case 'musical-instrument':
      case 'other-tool':
      case 'shield':
      case 'wondrous-item':
        apiCategory = [name + 's'];
        break;

      case 'vehicle':
        apiCategory = [
          'mounts-and-vehicles',
          'land-vehicles',
          'tack-harness-and-drawn-vehicles',
          'waterborne-vehicles',
        ];
        break;

      case 'animal':
        apiCategory = ['mounts-and-other-animals'];
        break;

      case 'artisan-tools':
        apiCategory = ['artisans-tools'];
        break;
    }
    Promise.all(
      apiCategory.map((current) =>
        axios
          .get<ApiItemCategory>(
            `https://www.dnd5eapi.co/api/equipment-categories/${current}`
          )
          .then((results) => results.data.equipment)
      )
    )
      .then((equipments) => equipments.flat())
      .then((items) => setItems(items));
  }, []);

  return (
    <div>
      <h3>{name}</h3>
      {items?.map((item: ApiItemCategory) => (
        <Item key={item.index} {...item} />
      ))}
    </div>
  );
}
