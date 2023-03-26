import { BaseRaceBuilders } from '@dnd-js/core';
import { Card, Stack } from '@mui/material';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RaceView from './app/components/RaceView';
import Root from './app/components/Root';
import Terrain from './app/components/Terrain/Terrain';
import ErrorPage from './app/ErrorPage';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/terrain',
        element: <Terrain />,
      },
      {
        path: '/races',
        element: (
          <Stack direction="row" flexWrap="wrap" justifyContent="center">
            {BaseRaceBuilders.map((race) => (
              <Card key={race.name} sx={{ m: 2, width: '40%' }}>
                <RaceView race={race.build()} />
              </Card>
            ))}
          </Stack>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
