'use client';

import React from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { useThemeContext } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/theme/theme.config';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeContext();
  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
