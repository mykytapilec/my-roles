// src/hooks/useApi.ts
import { useCallback } from 'react';
import { User } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function useApi() {
  const fetchUsers = useCallback(async (): Promise<User[]> => {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  }, []);

  const updateUserRoles = useCallback(async (id: number, roles: string[]): Promise<User> => {
    const res = await fetch(`${API_URL}/users/${id}/roles`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roles }),
    });
    if (!res.ok) throw new Error('Failed to update user roles');
    return res.json();
  }, []);

  return { fetchUsers, updateUserRoles };
}
