# Authentication, Authorization, and Data Security

## Overview

Ethio-Trip implements role-based sign-in for customers and guides using server-side authentication logic and session cookies.

## Sign-In

The login API accepts a role, username, and password. It validates the submitted credentials against the configured environment variables.

If the credentials are valid, the server creates a session token and sets it in a cookie.

The application uses the session endpoint to check whether a user is authenticated and to identify the user's role.

## Authorization

The application distinguishes customer and guide roles. Protected pages and actions should verify the current session and ensure the user has the appropriate role.

The interface redirecting a user is not sufficient security by itself. Sensitive operations must enforce authorization on the server.

## Session Cookies

Session cookies allow the browser to send session information with requests to the application.

Cookie security options should be configured appropriately, including HttpOnly, Secure in production, and an appropriate SameSite policy.

## Environment Variables

Authentication credentials must be configured through environment variables in the local development environment and the deployment platform.

Required login variables include:

- `CUSTOMER_USERNAME`
- `CUSTOMER_PASSWORD`
- `GUIDE_USERNAME`
- `GUIDE_PASSWORD`

The application may require additional session-related configuration depending on its authentication implementation.

Real credentials and secret values must never be committed to GitHub.

## Security Limitations

The current credential-based approach is suitable for demonstrating authentication concepts but is not a replacement for a complete production identity system.

Future improvements could include securely hashed user passwords, database-backed user accounts, session expiration and revocation, login rate limiting, and stronger account management.

Protected API routes must independently validate authentication and authorization before performing sensitive operations.