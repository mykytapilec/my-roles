# My Roles - Server

This is the backend of the **My Roles** application.  
It provides REST API endpoints for managing users and their roles.

---

## Features

- Fetch all users: `GET /users`
- Fetch all roles: `GET /roles`
- Update user roles: `PATCH /users/:id/roles`
- Supports multiple roles per user: `'admin'`, `'editor'`, `'viewer'`
- Written in TypeScript
- Includes Jest tests for API routes

---

## Setup Instructions
### 1. Install Dependencies

Navigate to the `server` folder and install packages:

```bash
cd server
npm install

### 2. Configure Environment Variables

Create a .env file in the server folder:
PORT=8000

### 3. Run the Server
Start the development server:
npm run dev

Server will be available at http://localhost:8000

---

## Testing
Run all tests using Jest:
npm run test

---

## API Endpoints
### 1. Get Users
GET /users

Response:
[
  {
    "id": 1,
    "name": "Alice",
    "email": "alice@test.com",
    "roles": ["admin"]
  },
  {
    "id": 2,
    "name": "Bob",
    "email": "bob@test.com",
    "roles": ["editor"]
  }
]

### 2. Get Roles
GET /roles

Response:
["admin", "editor", "viewer"]


### 2. Update User Roles
PATCH /users/:id/roles

Request Body:
{
  "roles": ["admin", "editor"]
}

Response:
{
  "id": 1,
  "name": "Alice",
  "email": "alice@test.com",
  "roles": ["admin", "editor"]
}

---

## Assumptions / Tradeoffs
- Roles are fixed: 'admin', 'editor', 'viewer'.
- No authentication implemented for this demo.
- Data is stored in-memory for simplicity (can be extended to database later).

---

## Tech Stack
- Node.js 20+
- NestJS
- TypeScript
- Jest + Supertest for testing