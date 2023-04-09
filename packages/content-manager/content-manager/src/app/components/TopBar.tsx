import { Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { colors } from '../styles/theme';

export default function TopBar() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      bgcolor={colors['tab.inactiveBackground']}
    >
      <Button size="small">File</Button>
      <Button size="small">Edit</Button>
      <Button size="small">Selection</Button>
      <Button size="small">View</Button>
      <Button size="small">Help</Button>
    </Stack>
  );
}
