import {
  IconButton as MuiIconButton,
  IconButtonProps,
  Stack,
  styled,
} from '@mui/material';
import React from 'react';

import RacesIcon from '../icons/Races';
import ClassesIcon from '../icons/Classes';
import ItemsIcon from '../icons/Items';
import MonstersIcon from '../icons/Monsters';
import SpellsIcon from '../icons/Spells';
import NpcsIcon from '../icons/Npcs';
import MechanicsIcon from '../icons/Mechanics';
import SidekicksIcon from '../icons/Sidekicks';
import BackgroundsIcon from '../icons/Backgrounds';
import { Link } from 'react-router-dom';

const IconButton = styled(MuiIconButton)<IconButtonProps>(() => ({
  width: '4rem',
  height: '4rem',

  '& img': {
    width: '100%',
    objectFit: 'contain',
  },
}));

export function ActivityBar() {
  const views = [
    { path: '/races', icon: <RacesIcon /> },
    { path: '/classes', icon: <ClassesIcon /> },
    { path: '/items', icon: <ItemsIcon /> },
    { path: '/monsters', icon: <MonstersIcon /> },
    { path: '/spells', icon: <SpellsIcon /> },
    { path: '/npcs', icon: <NpcsIcon /> },
    { path: '/mechanics', icon: <MechanicsIcon /> },
    { path: '/sidekicks', icon: <SidekicksIcon /> },
    { path: '/backgrounds', icon: <BackgroundsIcon /> },
  ];

  return (
    <Stack direction="column" spacing={1} p="0.5rem">
      {views.map((current) => (
        <Link to={current.path} key={current.path}>
          <IconButton>{current.icon}</IconButton>
        </Link>
      ))}
    </Stack>
  );
}

export default ActivityBar;
