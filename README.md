<div align="center">

# Next.js Better Auth Template

**A production-ready Next.js boilerplate with Better Auth, Prisma, and Neon Postgres.**

![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better%20Auth-purple?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

---

## 📖 About

A minimal, production-ready authentication template built with the modern Next.js App Router. It comes with email & password authentication and Google OAuth wired up out of the box, a protected dashboard route with server-side redirect guards, and a clean shadcn/ui component layer — so you can skip the auth setup and start building your actual product.

## ✨ Features

- **Better Auth** — email & password sign-up/in and Google OAuth in one config
- **Server-side sessions** — session checked on the server with cookie-based auth (no client-side token juggling)
- **Protected dashboard** — `/dashboard` redirects unauthenticated users to `/login`
- **Prisma + Neon Postgres** — typed ORM against a serverless Postgres database
- **shadcn/ui + Tailwind CSS v4** — accessible, themeable UI components
- **React Hook Form + Zod** — typed, validated forms for login and signup
- **Sonner toasts** — clean feedback for auth actions

## 🧰 Tech Stack

| Layer      | Technology                                              |
| ---------- | ------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) (App Router)           |
| UI         | [React 19](https://react.dev)                           |
| Language   | [TypeScript](https://www.typescriptlang.org)            |
| Auth       | [Better Auth](https://www.better-auth.com)              |
| ORM        | [Prisma 7](https://www.prisma.io)                       |
| Database   | [Neon](https://neon.tech) (serverless Postgres)         |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| Forms      | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |

## 🚦 Routes

| Route        | Description                                        |
| ------------ | -------------------------------------------------- |
| `/`          | Landing page with sign in / create account links   |
| `/login`     | Sign in with email & password or Google            |
| `/signup`    | Create a new account                               |
| `/dashboard` | Protected dashboard — redirects to `/login` if logged out |

## 📁 Project Structure

```
app/
├── (auth)/                  # Auth route group
│   ├── login/               # Login page + form
│   └── signup/              # Signup page + form
├── api/auth/[...all]/       # Better Auth HTTP handler
├── dashboard/               # Protected dashboard
├── generated/prisma/        # Generated Prisma client
├── layout.tsx
└── page.tsx                 # Landing page
components/
├── logo.tsx
└── ui/                      # shadcn/ui primitives (button, input, field, …)
lib/
├── auth.ts                  # Better Auth configuration
├── auth.actions.ts          # Server actions (signUp, signIn, signOut, …)
└── utils.ts
prisma/
└── schema.prisma            # Database schema
```

---

## 🚀 Installation

### Prerequisites

- [Node.js](https://nodejs.org) **20.9+**
- npm, pnpm, yarn, or bun
- A Postgres database — this template targets [Neon](https://neon.tech) (free tier works fine)

### 1. Clone the repository

```bash
git clone https://github.com/Fidel-Jr/nextjs-better-auth-template.git
cd nextjs-better-auth-template
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```bash
cp .env.local   # if present
```

If no `.env*` exists, create `.env.local` manually:

```bash
# Database connection string (from Neon)
DATABASE_URL="postgresql://USER:PASSWORD@EP.REGION.AWS.NEON.TECH/DBNAME?sslmode=require"

# Better Auth
BETTER_AUTH_SECRET="generate-me"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (optional — only needed for "Login with Google")
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Set up the database

Apply the existing migrations to your database:

```bash
npx prisma migrate dev --name init
```

Generate the Prisma client (outputs to `app/generated/prisma`):

```bash
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Create an account at `/signup` or sign in at `/login`, and land on the protected `/dashboard`.
