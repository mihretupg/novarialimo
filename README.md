# Novaria Limo

Luxury limo booking site with a React/Vite frontend and a PHP/MySQL backend.

## Backend Setup

Fast XAMPP setup on Windows:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\setup_backend.ps1
```

That script imports the schema, creates the admin/test users, verifies the tables, and starts the PHP backend.

1. Create the MySQL database and tables:

```sql
SOURCE backend/database/schema.sql;
```

2. Configure environment variables for your local PHP server:

```bash
NOVARIA_DB_HOST=127.0.0.1
NOVARIA_DB_PORT=3306
NOVARIA_DB_NAME=novaria
NOVARIA_DB_USER=root
NOVARIA_DB_PASS=
NOVARIA_FRONTEND_URL=http://localhost:5173
NOVARIA_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
```

3. In Google and Facebook OAuth settings, add these callback URLs:

```text
http://localhost:8000/backend/oauth/callback.php?provider=google
http://localhost:8000/backend/oauth/callback.php?provider=facebook
```

4. Seed an admin account:

```bash
php backend/database/seed_admin.php admin@novaria.local "ChangeMeNow!123"
```

Optional test riders:

```bash
php backend/database/seed_test_users.php
```

5. Start PHP from the project root:

```bash
php -S localhost:8000
```

## Frontend Setup

```bash
npm install
npm run dev
```

The dashboard routes are:

```text
#login
#dashboard
#admin
```

Riders can register and sign in with Novaria email/password credentials, or continue through Google or Facebook social login. Admin login uses the seeded MySQL account.

Security notes:

- Passwords are stored with PHP `password_hash`.
- Login, registration, logout, booking creation, and booking updates require a session CSRF token.
- Login and registration endpoints are rate-limited through the `auth_attempts` table.
- User registration always creates the `user` role; admin accounts must be seeded or managed server-side.
- Use HTTPS in production and set `NOVARIA_SESSION_SECURE=true`.
