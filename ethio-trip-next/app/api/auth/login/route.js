
import { NextResponse } from "next/server";
import {
  COOKIE_NAME,
  createSessionToken,
  safeEqual,
  sessionCookieOptions,
} from "../../../../lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();

    const role = body.role;
    const username =
      typeof body.username === "string" ? body.username.trim() : "";
    const password =
      typeof body.password === "string" ? body.password : "";

    if (
      !["customer", "guide"].includes(role) ||
      !username ||
      !password
    ) {
      return NextResponse.json(
        { error: "Enter your username and password." },
        { status: 400 }
      );
    }

    const expectedUsername =
      role === "customer"
        ? process.env.CUSTOMER_USERNAME
        : process.env.GUIDE_USERNAME;

    const expectedPassword =
      role === "customer"
        ? process.env.CUSTOMER_PASSWORD
        : process.env.GUIDE_PASSWORD;

    if (
      !expectedUsername ||
      !expectedPassword ||
      !safeEqual(username, expectedUsername) ||
      !safeEqual(password, expectedPassword)
    ) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = createSessionToken(username, role);
    const response = NextResponse.json({
      success: true,
      role,
      redirectTo: role === "guide" ? "/guide" : "/customer",
    });

    response.cookies.set(
      COOKIE_NAME,
      token,
      sessionCookieOptions()
    );

    return response;
  } catch {
    return NextResponse.json(
      { error: "Unable to sign in. Check the server configuration." },
      { status: 500 }
    );
  }
}
