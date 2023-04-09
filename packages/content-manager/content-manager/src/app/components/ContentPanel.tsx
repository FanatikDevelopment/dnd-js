import { Box, BoxProps } from '@mui/material';
import { colors } from '../styles/theme';

export default function ContentPanel({ children, ...props }: BoxProps) {
  return (
    <Box {...props} bgcolor={colors['editor.background']}>
      {children}
    </Box>
  );
}
