import {
  IconButton as MuiIconButton,
  IconButtonProps,
  Paper,
  Stack,
  styled,
} from '@mui/material';

import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';

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
import { colors } from '../styles/theme';

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
    {
      path: '/terrain',
      icon: <ExploreOutlinedIcon sx={{ width: '2rem', height: '2rem' }} />,
    },
  ];

  return (
    <Paper
      sx={{
        borderRadius: 0,
        background: colors['activityBar.background'],
        color: colors['activityBar.inactiveForeground'],
        fill: colors['activityBar.inactiveForeground'],
        stroke: colors['activityBar.inactiveForeground'],
      }}
    >
      <Stack direction="column" spacing={1} p="0.5rem">
        {views.map((current) => (
          <Link to={current.path} key={current.path}>
            <IconButton
              sx={{
                fill: colors['activityBar.inactiveForeground'],
                stroke: colors['activityBar.inactiveForeground'],
                color: colors['activityBar.inactiveForeground'],
              }}
            >
              {current.icon}
            </IconButton>
          </Link>
        ))}
      </Stack>
    </Paper>
  );
}

export default ActivityBar;
