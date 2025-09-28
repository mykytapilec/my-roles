import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import UsersClient from '../UsersClient';
import { User, Role } from '@/types/user';
import * as apiHook from '@/hooks/useApi';
import * as snackbarHook from '@/hooks/useSnackbar';

const mockUsers: User[] = [
  { id: 1, name: 'Alice', email: 'alice@test.com', roles: ['admin'] as Role[] },
  { id: 2, name: 'Bob', email: 'bob@test.com', roles: ['editor'] as Role[] },
];

describe('UsersClient', () => {
  beforeEach(() => {
    jest.spyOn(apiHook, 'useApi').mockReturnValue({
      fetchUsers: jest.fn().mockResolvedValue(mockUsers),
      updateUserRoles: jest.fn().mockResolvedValue(mockUsers[0]),
    });

    jest.spyOn(snackbarHook, 'useSnackbar').mockReturnValue({
      snackbar: { open: false, message: '', severity: 'info' },
      showSnackbar: jest.fn(),
      closeSnackbar: jest.fn(),
    });
  });

  it('renders filter and table', async () => {
    await act(async () => render(<UsersClient />));

    await waitFor(() => {
      expect(screen.getByLabelText(/Filter by Role/i)).toBeInTheDocument();
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('filters users by role', async () => {
    await act(async () => render(<UsersClient />));

    const select = await screen.findByLabelText(/Filter by Role/i);
    fireEvent.mouseDown(select);

    const adminOption = await screen.findByRole('option', { name: 'admin' });
    fireEvent.click(adminOption);

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });
  });
});
