'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Chip,
  Box,
} from '@mui/material';
import { User } from '@/types/user';

interface UsersTableProps {
  users: User[];
  onUpdateRoles: (userId: number, roles: string[]) => void;
}

export default function UsersTable({ users, onUpdateRoles }: UsersTableProps) {
  return (
    <Table stickyHeader sx={{ width: '100%' }}>
      <TableHead sx={{ backgroundColor: 'background.paper' }}>
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
                  onUpdateRoles(
                    user.id,
                    typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value
                  )
                }
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {(selected as string[]).map((role) => (
                      <Chip key={role} label={role} size="small" />
                    ))}
                  </Box>
                )}
                sx={{ minWidth: 120 }}
              >
                {['admin', 'editor', 'viewer'].map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
