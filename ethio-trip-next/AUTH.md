
@'
# Ethio-Trip Authentication

## Overview
Ethio-Trip uses a sign-in form with two roles: customer and guide.
Credentials are currently configured through server-side environment
variables. This is a demonstration authentication setup, not a
database-backed registration system.

## Sign-in flow
1. The user selects Customer or Trip guide.
2. The sign-in form sends the username, password, and role to
   POST /api/auth/login.
3. The server compares the submitted credentials with environment
   variables using a timing-safe comparison.
4. On success, the server creates a signed session token.
5. The token is stored in the ethio_trip_session cookie.
6. The user is redirected to the dashboard for their role.

## Sessions and cookies
- Tokens are signed with HMAC-SHA256.
- Sessions expire after seven days.
- Cookies use HttpOnly and SameSite=Lax.
- Secure is enabled in production.
- SESSION_SECRET must be at least 32 characters long.
- POST /api/auth/logout clears the session cookie.

## Authorization
The customer page requires a valid customer session.
The guide page requires a valid guide session.
The proxy checks for a session cookie before protected pages continue.
Server-side getSession() verifies the token signature and expiry.
Page-level role checks remain necessary because a cookie's presence
alone does not prove that the session is valid.

## Environment configuration
Copy .env.example to .env.local and replace its placeholder values.
Do not commit .env.local or expose credentials in client-side code.
Use a strong, unique SESSION_SECRET in production.

## Current limitations
- Accounts are configured with environment variables rather than
  stored in a user database.
- Passwords are compared with configured values; password hashing
  and database-backed account registration are not implemented.
- Trip request data and status changes currently use browser-side
  storage. They are not protected server-side records and should not
  be used for real customer bookings.
- Any future API that reads or changes private data must verify the
  session and role on the server, and enforce ownership where needed.
- The proxy performs an early cookie-presence check; it does not
  replace cryptographic session verification in server code.

## Verification checklist
- [ ] Missing session redirects from /customer and /guide to /signin.
- [ ] Invalid or expired tokens are rejected by server-side checks.
- [ ] Customers cannot access the guide dashboard.
- [ ] Guides cannot access the customer dashboard.
- [ ] Sign-out clears the session cookie.
- [ ] Production build completes successfully.
'@ | Set-Content -Encoding utf8 .\AUTH.md

Write-Host "Created AUTH.md" -ForegroundColor Green
