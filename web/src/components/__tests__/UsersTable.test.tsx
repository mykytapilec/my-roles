import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UsersTable from '../UsersTable';

const mockUsers = [
  { id: 1, name: 'Alice', email: 'alice@test.com', roles: ['admin'] },
  { id: 2, name: 'Bob', email: 'bob@test.com', roles: ['editor'] },
];

describe('UsersTable', () => {
  let onUpdateRoles: jest.Mock;

  beforeEach(() => {
    onUpdateRoles = jest.fn();
    render(<UsersTable users={mockUsers} onUpdateRoles={onUpdateRoles} />);
  });

  it('renders user names and roles', () => {
    mockUsers.forEach(user => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      user.roles.forEach(role => {
        expect(screen.getAllByRole('combobox')[mockUsers.indexOf(user)]).toHaveTextContent(role);
      });
    });
  });

  it('calls onUpdateRoles when a role is added', () => {
    const firstSelect = screen.getAllByRole('combobox')[0];
    fireEvent.mouseDown(firstSelect);

    const editorOption = screen.getByRole('option', { name: 'editor' });
    fireEvent.click(editorOption);

    expect(onUpdateRoles).toHaveBeenCalledWith(mockUsers[0].id, ['admin', 'editor']);
  });

  it('calls onUpdateRoles when a role is removed', () => {
    const firstSelect = screen.getAllByRole('combobox')[0];
    fireEvent.mouseDown(firstSelect);

    const adminOption = screen.getByRole('option', { name: 'admin' });
    fireEvent.click(adminOption);

    expect(onUpdateRoles).toHaveBeenCalledWith(mockUsers[0].id, []);
  });
});
