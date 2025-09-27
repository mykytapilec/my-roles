import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersService (real repository)', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return all users', () => {
    const users = service.getUsers();
    expect(users.length).toBeGreaterThan(0); // реальные пользователи из data.json
  });

  it('should return all roles', () => {
    const roles = service.getRoles();
    expect(roles.length).toBeGreaterThan(0);
  });

  it('should update user roles', () => {
    const users = service.getUsers();
    const userId = users[0].id;
    const updated = service.updateUserRoles(userId, ['admin']);
    expect(updated.roles).toContain('admin');
  });

  it('should throw error for invalid roles', () => {
    const users = service.getUsers();
    const userId = users[0].id;
    expect(() => service.updateUserRoles(userId, ['invalid'])).toThrow(BadRequestException);
  });
});
