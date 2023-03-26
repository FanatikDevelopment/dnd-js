import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ItemCategory from './components/ItemCategory';
import { ApiItemCategoryList } from './types';

import { ItemTypes } from '@dnd-js/core';

export default function ItemManagement() {
  return (
    <div>
      <div>
        <h2>Categories</h2>
        <ul>
          {ItemTypes.map((current) => (
            <li key={current}>{current}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
