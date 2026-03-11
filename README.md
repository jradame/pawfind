# PawFind 🐾

A full-stack pet adoption platform built with Next.js, PostgreSQL, Prisma, and Clerk auth. Built to modernize the pet adoption experience for Austin-area shelters.

## Live Demo
[pawfind.vercel.app](https://pawfind.vercel.app)

## Tech Stack
- **Framework:** Next.js 16 (App Router, Server Actions)
- **Database:** PostgreSQL (Neon) + Prisma ORM
- **Auth:** Clerk
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Features
- Browse adoptable pets with species and size filters
- Full pet detail pages with adoption application flow
- Save favorites (persisted with Zustand)
- Admin dashboard — add, edit, delete pets, review and approve/reject applications
- Clerk authentication with protected routes
- Seeded with real Austin shelter data

## Getting Started
```bash
git clone https://github.com/jradame/pawfind.git
cd pawfind
npm install
```

Set up your `.env`:
```
DATABASE_URL=your_postgres_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```
```bash
npx prisma db push
npx prisma db seed
npm run dev
```

## Project Structure
- `src/app/(store)` — public pet browsing pages
- `src/app/(marketing)` — about, contact, donate pages
- `src/app/admin` — admin dashboard
- `src/lib/actions` — server actions
- `prisma` — schema and seed data

## Author
Justin Adame — [github.com/jradame](https://github.com/jradame)

