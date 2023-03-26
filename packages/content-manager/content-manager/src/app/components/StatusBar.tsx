import { Button, Stack } from '@mui/material';
import React from 'react';

export default function StatusBar() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Button size="small">0 Errors</Button>
      <Button size="small">0 Warnings</Button>
      <Button size="small">0 Logs</Button>
    </Stack>
  );
}
