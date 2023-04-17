import { BaseRaceBuilders } from '@dnd-js/core';
import { Card, Stack, ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RaceView from './app/components/RaceView';
import Root from './app/components/Root';
import GlRoot from './app/components/graphics/Root';
import Terrain from './app/components/Terrain/Terrain';
import ErrorPage from './app/ErrorPage';
import ItemManagement from './app/ItemManagement';
import { theme } from './app/styles/theme';

import { Provider } from 'react-redux';
import { store } from './app/store';

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
      {
        path: '/items',
        element: <ItemManagement />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: '/graphics',
    element: <GlRoot />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>
  </Provider>
);
