import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ApiGear,
  ApiItem,
  ApiItemCategory,
  ApiItemCategoryList,
} from './types';

import { CurrencyShortName, Item, ItemType } from '@dnd-js/core';

export default function Home() {
  const [list, setList] = useState<Item<any>[]>();

  useEffect(() => {
    axios
      .get<ApiItemCategory>(
        'https://www.dnd5eapi.co/api/equipment-categories/adventuring-gear'
      )
      .then((result) =>
        Promise.all(
          result.data.equipment.map((current) => {
            return axios
              .get<ApiItem>(`https://www.dnd5eapi.co${current.url}`)
              .then((it) => it.data);
          })
        )
      )
      .then((results) => {
        setList(
          results
            .filter(
              ({ gear_category }) =>
                ![
                  'ammunition',
                  'standard-gear',
                  'equipment-packs',
                  'holy-symbols',
                ].includes(gear_category?.index ?? '')
            )
            .map(
              ({
                name,
                desc,
                cost,
                weight,
                index,
                equipment_category,
                url,
                gear_category,
                ...current
              }) => ({
                name,
                itemType: gear_category?.index as ItemType,
                description: desc.join('\n'),
                cost: {
                  [(cost?.unit as CurrencyShortName) ?? 'gp']:
                    cost?.quantity ?? 0,
                },
                weight: weight ?? 0,
                extra: {
                  ...current,
                  gear_category:
                    (current as ApiGear).gear_category?.index ?? undefined,
                },
              })
            )
        );
      });
  }, []);

  return <pre>{JSON.stringify(list, null, 4)}</pre>;
}
