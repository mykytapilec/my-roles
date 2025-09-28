'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Box,
  Chip,
} from '@mui/material';
import { User } from '@/types/user';

interface UsersTableProps {
  users: User[];
  onUpdateRoles: (userId: number, roles: string[]) => void;
}

const allRoles = ['admin', 'editor', 'viewer'];

export default function UsersTable({ users, onUpdateRoles }: UsersTableProps) {
  const handleChange = (userId: number, roles: string[]) => {
    onUpdateRoles(userId, roles);
  };

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
                      handleChange(
                        user.id,
                        typeof e.target.value === 'string'
                          ? e.target.value.split(',')
                          : e.target.value
                      )
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as string[]).map((role) => (
                          <Chip key={role} label={role} />
                        ))}
                      </Box>
                    )}
                    sx={{ minWidth: 150 }}
                  >
                    {allRoles.map((role) => (
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
      </TableContainer>
    </Box>
  );
}
