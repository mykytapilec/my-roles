export interface User {
  id: number;
  name: string;
  roles: string[];
}

export interface DataFile {
  users: User[];
  roles: string[];
}
