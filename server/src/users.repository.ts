import * as fs from 'fs';
import * as path from 'path';
import { User, DataFile } from './users.types';

export class UsersRepository {
  private readonly dataFilePath = path.join(__dirname, '..', 'data.json');

  private readData(): DataFile {
    const file = fs.readFileSync(this.dataFilePath, 'utf-8');
    return JSON.parse(file);
  }

  private writeData(data: DataFile) {
    fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  findAllUsers(): User[] {
    return this.readData().users;
  }

  findAllRoles(): string[] {
    return this.readData().roles;
  }

  findUserById(id: number): User | undefined {
    return this.readData().users.find((u) => u.id === id);
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
