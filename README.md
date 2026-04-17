# Task Manager - MAURICIO TORRICO

A full-stack task management application built with React, TypeScript, Node.js, Express, and PostgreSQL. It is part of the postgraduate course "Diplomado de desarrollo Fullstack" from Universidad Católica Boliviana - San Pablo, La Paz branch.

---

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Deployment:** Vercel (frontend) + Render (backend) + Neon (database)

---

## Prerequisites

To get started, it is necessary to have installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/) (local installation)
- [Git](https://git-scm.com/)

---

## Project Structure

```Directories Structure
task-manager/
📦frontend
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜EmptyState.tsx
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┣ 📜TaskCard.tsx
 ┃ ┃ ┣ 📜TaskCounter.tsx
 ┃ ┃ ┣ 📜TaskInput.tsx
 ┃ ┃ ┗ 📜TaskList.tsx
 ┃ ┣ 📂styles
 ┃ ┃ ┣ 📜EmptyState.css
 ┃ ┃ ┣ 📜Footer.css
 ┃ ┃ ┣ 📜Header.css
 ┃ ┃ ┣ 📜TaskCard.css
 ┃ ┃ ┣ 📜TaskCounter.css
 ┃ ┃ ┗ 📜TaskInput.css
 ┃ ┣ 📂types
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜declarations.d.ts
 ┃ ┗ 📜vite-env.d.ts
 ┗ 📜.env
📦backend
 ┣ 📂prisma
 ┃ ┣ 📂migrations
 ┃ ┗ 📜schema.prisma
 ┣ 📂src
 ┃ ┗ 📜index.ts
 ┣ 📜.env
 ┣ 📜prisma.config.ts
 ┗ 📜tsconfig.json
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` folder:

```Setting up local url
VITE_API_URL=http://localhost:3000
```

Run the development server:

```bash
npm run dev
```

---

## Backend Setup

```bash
cd backend
npm install
```

Install required dependencies:

```bash
npm install express cors dotenv
npm install --save-dev @types/node @types/express @types/cors ts-node-dev typescript
```

Create a `.env` file inside the `backend/` folder:

```Creating the variable for the DB
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/taskmanager?schema=public"
```

Replace `USER` and `PASSWORD` with your PostgreSQL credentials.

Run the development server:

```bash
npm run dev
```

---

## Database Setup (Local)

Install Prisma:

```bash
npm install prisma --save-dev
npm install @prisma/client @prisma/adapter-pg
npm install dotenv
```

Initialize Prisma:

```bash
npx prisma init
```

Run the initial migration to create the database and tables:

```bash
npx prisma migrate dev --name init
```

If you need to apply existing migrations (e.g., after cloning the repo):

```bash
npx prisma migrate deploy
```

Generate the Prisma client:

```bash
npx prisma generate
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a new task |
| DELETE | `/tasks/:id` | Delete a task by ID |
| PUT | `/tasks/:id` | Toggle task completed status |
| POST | `/login` | Gets a token that expires after an hour only when using the correct body structure |
| GET | `/private` | Allows or denies entry depending on the token provided in the request |

**⚠️ The correct body structure for `/login` endpoint:**

```JSON
{
    "username": "admin",
    "password": "password"
}
```

### Example request body for POST `/tasks`

```json
{
  "text": "My new task",
  "completed": false
}
```

---

## Environment Variables

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000` |

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/taskmanager` |

---

## Deployment

### Frontend — Vercel

1. Create an account at [vercel.com](https://vercel.com)
2. Create a new project and connect your GitHub repository
3. Set the **Root Directory** to `frontend`
4. Add the environment variable `VITE_API_URL` with your Render backend URL (no trailing slash)
5. Deploy — Vercel auto-detects Vite and configures the build automatically

### Backend — Render

1. Create an account at [render.com](https://render.com)
2. Create a new **Web Service** and connect your GitHub repository
3. Set the **Root Directory** to `backend`
4. Set the following commands:
   - **Build Command:** `npm install && npx prisma generate && npx tsc`
   - **Start Command:** `node dist/index.js`
5. Add the environment variable `DATABASE_URL` with your Neon connection string

### Database — Neon

1. Create an account at [neon.com](https://neon.com)
2. Create a new project and copy the `DATABASE_URL`
3. Run migrations against Neon:

```bash
npx prisma migrate deploy
```

---

## Common Issues

**`Cannot find module 'cors'`** — Run `npm install cors` and `npm install --save-dev @types/cors`

**`Property 'env' does not exist on type 'ImportMeta'`** — Create `src/vite-env.d.ts` with:

```ts
/// <reference types="vite/client" />
```

**`CSS module not found`** — Create `src/declarations.d.ts` with:

```ts
declare module "*.css";
```

**`PrismaClient` needs valid options** — Make sure `import "dotenv/config"` is the first line in `index.ts`

---

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npx prisma migrate dev --name <name>` | Create a new migration |
| `npx prisma migrate deploy` | Apply migrations to production DB |
| `npx prisma generate` | Generate Prisma client |
| `npx prisma studio` | Open Prisma visual database browser |
| `git add . && git commit -m "msg" && git push` | Push changes to GitHub |
