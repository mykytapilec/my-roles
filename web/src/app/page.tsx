'use client';

import React, { useEffect, useState } from 'react';
import { CircularProgress, Alert, Snackbar } from '@mui/material';
import UsersTable from '@/components/UsersTable';
import { useApi } from '@/hooks/useApi';
import { User } from '@/types/user';

export default function HomePage() {
  const { fetchUsers, updateUserRoles } = useApi();
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [fetchUsers]);

  const handleUpdateRoles = async (userId: number, roles: string[]) => {
    if (!users) return;
    try {
      const updated = await updateUserRoles(userId, roles);
      setUsers(users.map((u) => (u.id === userId ? updated : u)));
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to update roles' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '' });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Failed to load users</Alert>;
  if (!users || users.length === 0)
    return <Alert severity="info">No users found</Alert>;

  return (
    <>
      <UsersTable users={users} onUpdateRoles={handleUpdateRoles} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
