import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.join(__dirname, 'data.json');

@Injectable()
export class UsersService {
  private readData() {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(raw);
  }

  private writeData(data: any) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  }

  getUsers() {
    return this.readData().users;
  }

  getRoles() {
    return this.readData().roles;
  }

  updateUserRoles(userId: number, roles: string[]) {
    const data = this.readData();
    const user = data.users.find((u) => u.id === userId);
    if (!user) return null;

    user.roles = roles;
    this.writeData(data);
    return user;
  }
}
