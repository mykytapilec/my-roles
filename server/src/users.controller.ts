import { Controller, Get, Param, Patch, Body, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.types';
import { UpdateUserRolesDto } from './common/dto/update-user-roles.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  getUsers(): User[] {
    return this.usersService.getUsers();
  }

  @Get('roles')
  getRoles(): string[] {
    return this.usersService.getRoles();
  }

  @Patch('users/:id/roles')
  updateUserRoles(@Param('id') id: string, @Body() body: UpdateUserRolesDto): User {
    const updatedUser = this.usersService.updateUserRoles(Number(id), body.roles);

    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return updatedUser;
  }
}
