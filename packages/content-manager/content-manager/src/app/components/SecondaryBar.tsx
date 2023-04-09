import { IconButton, Stack } from '@mui/material';
import React from 'react';
import BugReportIcon from '@mui/icons-material/BugReport';
import { colors } from '../styles/theme';

export default function SecondaryBar() {
  return (
    <Stack
      direction="column"
      spacing={1}
      p="0.5rem"
      bgcolor={colors['activityBar.background']}
    >
      <IconButton size="large" sx={{ width: '4rem', height: '4rem' }}>
        <BugReportIcon />
      </IconButton>
      <IconButton size="large" sx={{ width: '4rem', height: '4rem' }}>
        <BugReportIcon />
      </IconButton>
      <IconButton size="large" sx={{ width: '4rem', height: '4rem' }}>
        <BugReportIcon />
      </IconButton>
      <IconButton size="large" sx={{ width: '4rem', height: '4rem' }}>
        <BugReportIcon />
      </IconButton>
      <IconButton size="large" sx={{ width: '4rem', height: '4rem' }}>
        <BugReportIcon />
      </IconButton>
      <IconButton
        size="large"
        sx={{ width: '4rem', height: '4rem', p: '0.5rem' }}
      >
        <BugReportIcon />
      </IconButton>
    </Stack>
  );
}
