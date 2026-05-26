# Novaria Limo

Luxury limo booking website for Novaria Limo, built with a React/Vite frontend and a PHP/MySQL backend.

## Project Overview

Novaria Limo provides online booking, service information, fleet highlights, user sign-in, and an admin dashboard for reviewing bookings.

## Tech Stack

- React
- Vite
- Tailwind CSS
- PHP
- MySQL

## Local Setup

Install frontend dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Start the PHP backend from the project root:

```bash
php -S localhost:8000
```

## Environment

Configure the backend environment for the target server:

```bash
NOVARIA_DB_HOST=127.0.0.1
NOVARIA_DB_PORT=3306
NOVARIA_DB_NAME=novaria
NOVARIA_DB_USER=root
NOVARIA_DB_PASS=
NOVARIA_FRONTEND_URL=http://localhost:5173
NOVARIA_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
```

## Database

Import the database schema:

```sql
SOURCE backend/database/schema.sql;
```

## Production Notes

- Use HTTPS in production.
- Configure live database credentials on the server.
- Configure OAuth callback URLs for the production domain.
- Keep local credentials and test account details out of the repository.
