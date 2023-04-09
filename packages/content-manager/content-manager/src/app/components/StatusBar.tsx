import { Button, Stack, useTheme } from '@mui/material';
import React from 'react';

export default function StatusBar() {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      bgcolor={theme.palette.secondary.main}
    >
      <Button size="small">0 Errors</Button>
      <Button size="small">0 Warnings</Button>
      <Button size="small">0 Logs</Button>
    </Stack>
  );
}
