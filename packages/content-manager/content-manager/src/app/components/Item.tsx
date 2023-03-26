import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ApiResource, ApiItem } from '../types';

export default function Item({ name, url }: ApiResource) {
  const [item, setItem] = useState<ApiItem>();
  useEffect(() => {
    axios.get<ApiItem>(`https://www.dnd5eapi.co${url}`).then((results) => {
      setItem(results.data);
    });
  }, []);

  return (
    <div>
      <h4>{name}</h4>
      <h5>Desc</h5>
      <div>
        {item?.desc.map((current) => (
          <p>{current}</p>
        ))}
      </div>
      <h5>Cost</h5>
      <div>
        {item?.cost?.quantity ?? 0}
        {item?.cost?.unit}
      </div>
      <h5>Weight</h5>
      <div>{item?.weight ?? 0}</div>
    </div>
  );
}

/*

1 {...}
Weapon

2 {...}
Armor

3 {...}
Gear

4 {...}

*/
