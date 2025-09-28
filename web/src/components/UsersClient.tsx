'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  SelectChangeEvent,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import UsersTable from './UsersTable';
import { useApi } from '@/hooks/useApi';
import { useSnackbar } from '@/hooks/useSnackbar';
import { User } from '@/types/user';

export default function UsersClient() {
  const { fetchUsers, updateUserRoles } = useApi();
  const [users, setUsers] = useState<User[] | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [rolesFilter, setRolesFilter] = useState<string[]>([]);

  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (!users) return;
    if (rolesFilter.length === 0) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((u) => u.roles.some((role) => rolesFilter.includes(role)))
      );
    }
  }, [rolesFilter, users]);

  const handleUpdateRoles = async (userId: number, roles: string[]) => {
    if (!users) return;
    try {
      const updated = await updateUserRoles(userId, roles);
      setUsers(users.map((u) => (u.id === userId ? updated : u)));
    } catch (err) {
      console.error(err);
      showSnackbar('Failed to update roles', 'error');
    }
  };

  const handleFilterChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setRolesFilter(typeof value === 'string' ? value.split(',') : value);
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh" flexDirection="column">
        <CircularProgress />
        <Box mt={2}>Loading users...</Box>
      </Box>
    );

  if (error) return <Alert severity="error">Failed to load users</Alert>;
  if (!users || users.length === 0) return <Alert severity="info">No users found</Alert>;

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
        bgcolor: 'background.paper',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {/* Фильтр по ролям */}
      <FormControl sx={{ mb: 2, width: '100%', maxWidth: 300 }}>
        <InputLabel id="roles-filter-label">Filter by Role</InputLabel>
        <Select
          labelId="roles-filter-label"
          multiple
          value={rolesFilter}
          onChange={handleFilterChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {['admin', 'editor', 'viewer'].map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Таблица пользователей */}
      <UsersTable users={filteredUsers!} onUpdateRoles={handleUpdateRoles} />

      {/* Снэкбар */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionProps={{ appear: true }}
      >
        <Box
          sx={{
            bgcolor:
              snackbar.severity === 'error'
                ? 'error.main'
                : snackbar.severity === 'success'
                ? 'success.main'
                : snackbar.severity === 'warning'
                ? 'warning.main'
                : 'info.main',
            color: 'primary.contrastText',
            px: 3,
            py: 1.5,
            borderRadius: 2,
            boxShadow: 3,
            minWidth: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 500,
          }}
        >
          {snackbar.message}
        </Box>
      </Snackbar>
    </Box>
  );
}
