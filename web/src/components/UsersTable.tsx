'use client';

import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Select, MenuItem, Checkbox, ListItemText, Box
} from '@mui/material';
import { User } from '@/types/user';

const ALL_ROLES = ['admin', 'editor', 'viewer'];

interface UsersTableProps {
  users: User[];
  onUpdateRoles?: (id: number, roles: string[]) => void;
}

export default function UsersTable({ users, onUpdateRoles }: UsersTableProps) {
  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    multiple
                    value={user.roles}
                    onChange={(e) =>
                      onUpdateRoles?.(user.id, e.target.value as string[])
                    }
                    renderValue={(selected) => (selected as string[]).join(', ')}
                    sx={{ minWidth: 150 }}
                  >
                    {ALL_ROLES.map((role) => (
                      <MenuItem key={role} value={role}>
                        <Checkbox checked={user.roles.includes(role)} />
                        <ListItemText primary={role} />
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
