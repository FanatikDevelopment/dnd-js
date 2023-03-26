import { Button, Stack } from '@mui/material';
import React from 'react';

export default function TopBar() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Button size="small">File</Button>
      <Button size="small">Edit</Button>
      <Button size="small">Selection</Button>
      <Button size="small">View</Button>
      <Button size="small">Help</Button>
    </Stack>
  );
}
