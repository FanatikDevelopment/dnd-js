import { Box } from '@mui/material';
import React, { ReactNode } from 'react';
import ActivityBar from './ActivityBar';
import ContentPanel from './ContentPanel';
import SecondaryBar from './SecondaryBar';
import StatusBar from './StatusBar';
import TopBar from './TopBar';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <Box
      display="flex"
      height="100%"
      flexDirection="column"
      position="relative"
    >
      <TopBar />
      <Box display="flex" flexGrow={1} overflow="auto">
        <ActivityBar />
        <Box flexGrow={1} height="100%" overflow="auto">
          <ContentPanel>
            <Outlet />
          </ContentPanel>
        </Box>
        <SecondaryBar />
      </Box>
      <StatusBar />
    </Box>
  );
}
