# StudyNook Client

A modern Next.js app for discovering, booking, and managing study rooms and shared workspaces.

## Overview

StudyNook is a polished React/Next.js application for students and workspace hosts. It lets users search and filter room listings, book time slots, and manage owned rooms.

## Key Features

- Home landing page with hero section, feature highlights, and room previews
- Browse available rooms with search, amenity filters, price range, and pagination
- Room details page with booking form, amenities, rates, and statistics
- Authenticated room creation and listing management
- User dashboard for bookings and booking cancellation
- Email/password authentication plus Google social sign-in
- Responsive design with animated UI using Framer Motion

## Technology Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- better-auth for authentication
- MongoDB as the auth database adapter
- Framer Motion for motion effects
- React Hot Toast for notifications
- Lucide React icons
- @heroui/react UI primitives

## Project Structure

- `src/app` — application routes, pages, and layout
- `src/components` — reusable UI components and modals
- `src/lib` — client and server auth helpers plus room data utilities
- `src/app/api/auth/[...all]/route.js` — auth API route for Better Auth

## Available Pages

- `/` — Home page with hero, feature highlights, and preview rooms
- `/rooms` — Room search and discovery page with filters and pagination
- `/rooms/[id]` — Room details page and booking section
- `/add-room` — Add a new room listing (authenticated users only)
- `/my-listings` — Manage your owned room listings and analytics
- `/my-bookings` — View and cancel your room bookings
- `/login` — Login page with email/password and Google sign-in
- `/register` — Register new account page

## Environment Variables

Create a `.env.local` file at the project root with these values:

```env
MONGO_URI=<your-mongodb-connection-string>
GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<your-google-oauth-client-secret>
NEXT_PUBLIC_API_URL=<your-backend-api-base-url>
BETTER_AUTH_URL=<your-better-auth-base-url>
```

- `MONGO_URI` is required for Better Auth to persist users.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` enable Google social sign-in.
- `NEXT_PUBLIC_API_URL` points the client to the backend rooms and bookings API.
- `BETTER_AUTH_URL` is the Better Auth client base URL used by `src/lib/auth-client.js`.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000` after the server starts.

## Build

```bash
npm run build
```

## Notes

- The client consumes a separate backend API for rooms, bookings, and room details.
- Auth is handled by Better Auth with MongoDB adapter and JWT session cookies.
- If pages fail to load, verify `NEXT_PUBLIC_API_URL`, `BETTER_AUTH_URL`, and MongoDB credentials.
