# Employee Management API

Employee management app with an Express backend and Vite React frontend in one Replit-friendly project.

## Features

- Add, update, and delete employees
- Search by employee name
- Filter by department
- Update employee status
- Pagination support on the API
- Single deployment for frontend and backend

## Local Run

```bash
npm install
npm run dev
```

The app runs on `http://localhost:3000` by default.

## Replit Deployment

This repo now includes a [`.replit`](/d:/Awesh-DRIVE%20D/PROJECTS/employee-management-api/.replit) file for Replit.

Workspace run command:

```bash
npm run dev
```

Deployment build command:

```bash
npm run build
```

Deployment run command:

```bash
npm run start
```

Notes:

- The server uses `process.env.PORT`, so it will bind correctly on Replit.
- In production, Express serves the built frontend from `dist/`.
- API routes stay available under `/employees` and `/api/health`.
