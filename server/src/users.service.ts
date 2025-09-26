import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { User, DataFile } from './users.types';

@Injectable()
export class UsersService {
  private readonly dataFilePath = path.join(__dirname, '..', 'data.json');

  private readData(): DataFile {
    const file = fs.readFileSync(this.dataFilePath, 'utf-8');
    return JSON.parse(file);
  }

  private writeData(data: DataFile) {
    fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  getUsers(): User[] {
    return this.readData().users;
  }

  getRoles(): string[] {
    return this.readData().roles;
  }

  updateUserRoles(id: number, roles: string[]): User | null {
    const data = this.readData();
    const user = data.users.find((u) => u.id === id);

    if (!user) return null;

    user.roles = roles;
    this.writeData(data);
    return user;
  }
}
