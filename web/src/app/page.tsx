'use client';

import React from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';
import UsersClient from '@/components/UsersClient';
import { useThemeContext } from '@/context/ThemeContext';

export default function UsersPage() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: '0 auto',
        px: { xs: 2, sm: 3, md: 4 },
        py: 2,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        p={2}
        bgcolor="background.paper"
        boxShadow={1}
        position="sticky"
        top={0}
        zIndex={10}
        borderRadius={2}
      >
        <Typography variant="h5">Users Management</Typography>
        <FormControlLabel
          control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />}
          label="Dark Mode"
        />
      </Box>

      <UsersClient />
    </Box>
  );
}
