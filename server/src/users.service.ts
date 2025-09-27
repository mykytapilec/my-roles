import { Injectable, BadRequestException } from '@nestjs/common';

import { UsersRepository } from './users.repository';
import { User } from './users.types';

@Injectable()
export class UsersService {
  private readonly usersRepo = new UsersRepository();

  getUsers(): User[] {
    return this.usersRepo.findAllUsers();
  }

  getRoles(): string[] {
    return this.usersRepo.findAllRoles();
  }

  updateUserRoles(id: number, roles: string[]): User | null {
    const availableRoles = this.usersRepo.findAllRoles();

    const invalidRoles = roles.filter((r) => !availableRoles.includes(r));
    if (invalidRoles.length > 0) {
      throw new BadRequestException(`Invalid roles: ${invalidRoles.join(', ')}`);
    }

    return this.usersRepo.updateUserRoles(id, roles);
  }
}
