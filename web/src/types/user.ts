export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

export type Role = "admin" | "editor" | "viewer";
