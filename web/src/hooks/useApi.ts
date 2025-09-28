"use client";

import { useState, useEffect } from "react";
import { User, Role } from "@/types/user";

export function useApi() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "http://localhost:3000";

  async function fetchUsers() {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  }

  async function fetchRoles() {
    try {
      const res = await fetch(`${API_URL}/roles`);
      if (!res.ok) throw new Error("Failed to fetch roles");
      const data: Role[] = await res.json();
      setRoles(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  }

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  const updateUserRoles = async (userId: number, newRoles: Role[]) => {
    try {
      const res = await fetch(`${API_URL}/users/${userId}/roles`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roles: newRoles }),
      });
      if (!res.ok) throw new Error("Failed to update roles");
      const updatedUser: User = await res.json();
      setUsers((prev) => prev.map((u) => (u.id === userId ? updatedUser : u)));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  return {
    users,
    roles,
    loading,
    error,
    updateUserRoles,
  };
}
