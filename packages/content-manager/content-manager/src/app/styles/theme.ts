import { alpha } from '@mui/material';
import { createTheme, darken, lighten, PaletteMode } from '@mui/material';

import dark from './theme_dark.json';

export const colors = dark.colors;

export const theme = createTheme({
  palette: {
    mode: dark.type as PaletteMode,
    background: {
      default: dark.colors['editor.background'],
      paper: dark.colors['sideBar.background'],
    },
    primary: {
      main: dark.colors['button.background'],
      light: lighten(dark.colors['button.background'], 0.1),
      dark: darken(dark.colors['button.background'], 0.1),
      contrastText: dark.colors['button.foreground'],
    },

    secondary: {
      main: dark.colors['activityBarBadge.background'],
      light: lighten(dark.colors['activityBarBadge.background'], 0.1),
      dark: darken(dark.colors['activityBarBadge.background'], 0.1),
      contrastText: dark.colors['activityBarBadge.foreground'],
    },
    text: {
      disabled: dark.colors.disabledForeground,
      primary: dark.colors.foreground,
      secondary: alpha(dark.colors.foreground, 0.6),
    },
    divider: alpha(dark.colors.foreground, 0.25),
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
          backgroundColor: alpha(colors['panel.background'], 0.6),
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          lineHeight: '0.875rem',
          minWidth: 'inherit',

          '&:hover': {
            backgroundColor: alpha(colors['button.foreground'], 0.5),
          },
          '&..MuiButton-textSizeMedium': {
            fontSize: '0.875rem',
          },
          '&.MuiButton-text': {
            textTransform: 'capitalize',
            fontWeight: '400',
            color: colors['button.foreground'],
          },

          '&.MuiTouchRipple-root': {
            color: colors['button.foreground'],
          },
        },
      },
    },
  },
});
