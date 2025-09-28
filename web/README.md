# My Roles - Web Frontend
This is the frontend of the **My Roles** application, built with **Next.js** and **Material-UI (MUI)**.  
It connects to the NestJS backend to display and manage users and their roles.

---

## Features
- View all users in a table
- Edit user roles directly in the table
- Filter users by role (`admin`, `editor`, `viewer`)
- Dark mode toggle
- Snackbars for notifications on role updates

---

## Setup Instructions
### 1. Install Dependencies
Navigate to the `web` folder and install packages:

```bash
cd web
npm install

### 2. Configure Environment Variables
Create a .env.local file in the web/ folder:

NEXT_PUBLIC_API_URL=http://localhost:8000

### 3. Run the Web App
Start the development server:

npm run dev

Web app will be available at http://localhost:3000

---

## Testing
Run all tests using Jest:
npm run test

---

## Assumptions / Tradeoffs
- Roles are fixed: 'admin', 'editor', 'viewer'.
- No authentication implemented.
- Connected to local backend server (NEXT_PUBLIC_API_URL).
- Uses Material-UI for UI components for rapid prototyping.

---

## Tech Stack
- Next.js 13
- React 18
- TypeScript
- Material-UI
- Jest + React Testing Library