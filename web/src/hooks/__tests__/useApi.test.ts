import { renderHook } from '@testing-library/react';
import { useApi } from '../useApi';
import { User } from '@/types/user';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('useApi', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8000';
  });

  it('fetchUsers returns users', async () => {
    const mockUsers: User[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com', roles: ['admin'] },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockUsers));

    const { result } = renderHook(() => useApi());
    const users = await result.current.fetchUsers();

    expect(users).toEqual(mockUsers);
    expect(fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  });

  it('updateUserRoles updates roles', async () => {
    const updatedUser: User = {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      roles: ['admin', 'editor'],
    };
    fetchMock.mockResponseOnce(JSON.stringify(updatedUser));

    const { result } = renderHook(() => useApi());
    const user = await result.current.updateUserRoles(1, ['admin', 'editor']);

    expect(user).toEqual(updatedUser);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/users/1/roles`,
      expect.objectContaining({
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roles: ['admin', 'editor'] }),
      })
    );
  });
});
