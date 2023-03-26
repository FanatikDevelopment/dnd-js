import { BaseRaceBuilders } from '@dnd-js/core';
import { Box, BoxProps } from '@mui/material';
import React from 'react';
import RaceView from './RaceView';

export default function ContentPanel({ children, ...props }: BoxProps) {
  return <Box {...props}>{children}</Box>;
}
