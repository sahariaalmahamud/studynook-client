# StudyNook Client

A modern Next.js client for booking study rooms/library and managing workspace listings.

## Overview

StudyNook is a polished React/Next.js application for students and teams to discover, book, and manage private study rooms. It includes email/password and Google authentication, room listings, booking management, and user-owned room administration.

## Key Features

- Home landing page with hero, features, and room previews
- Room discovery and detailed room pages
- Add new room listings (requires authenticated user)
- Manage your listings and bookings
- Login and registration flows
- Responsive UI with animation and modern styling

## Technology Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Better Auth with MongoDB adapter
- MongoDB
- Framer Motion
- React Hot Toast
- Lucide React icons

## Project Structure

- `src/app` - application routes and layouts
- `src/components` - reusable UI components
- `src/lib` - authentication client and server auth setup
- `src/app/api/auth/[...all]/route.js` - authentication API route

## Pages

- `/` — Home page with hero, features, and room previews
- `/rooms` — Browse all available rooms
- `/rooms/[id]` — Room details page
- `/add-room` — Add a new room listing
- `/my-listings` — Manage owned room listings
- `/my-bookings` — View and manage bookings
- `/login` — User sign-in
- `/register` — User registration

## Environment Variables

Create a `.env.local` file at the project root with the following values:

```env
MONGO_URI=<your-mongodb-connection-string>
GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<your-google-oauth-client-secret>
```

> `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are required for Google social sign-in.

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

- The app uses server-side auth via `better-auth` and MongoDB.
- UI styling is built with Tailwind CSS and is optimized for responsive layouts.
- If you see errors loading the app, verify your environment variables and MongoDB connection.
