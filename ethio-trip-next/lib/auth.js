
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "ethio_trip_session";
const SESSION_DURATION = 60 * 60 * 24 * 7;

function getSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be at least 32 characters.");
  }

  return secret;
}

function safeEqual(value, expected) {
  if (typeof value !== "string" || typeof expected !== "string") {
    return false;
  }

  const a = Buffer.from(value);
  const b = Buffer.from(expected);

  return a.length === b.length && timingSafeEqual(a, b);
}

function sign(encodedPayload) {
  return createHmac("sha256", getSecret())
    .update(encodedPayload)
    .digest("base64url");
}

export function createSessionToken(username, role) {
  const payload = {
    username,
    role,
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION,
  };

  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");

  return `${encoded}.${sign(encoded)}`;
}

export function verifySessionToken(token) {
  try {
    if (typeof token !== "string") return null;

    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [encoded, signature] = parts;
    if (!safeEqual(signature, sign(encoded))) return null;

    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    );

    if (
      !payload.username ||
      !["customer", "guide"].includes(payload.role) ||
      !Number.isFinite(payload.exp) ||
      payload.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return {
      username: payload.username,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  return verifySessionToken(token);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  };
}

export { COOKIE_NAME, safeEqual };
