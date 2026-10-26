
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
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
    const password =
      typeof body.password === "string" ? body.password : "";

    if (!["customer", "guide"].includes(role) || !password) {
      return NextResponse.json(
        { error: "Enter your login details." },
        { status: 400 }
      );
    }

    let username = "";

    if (role === "guide") {
      // Preserve the existing guide username/password authentication.
      username =
        typeof body.username === "string" ? body.username.trim() : "";

      const expectedUsername = process.env.GUIDE_USERNAME;
      const expectedPassword = process.env.GUIDE_PASSWORD;

      if (
        !username ||
        !expectedUsername ||
        !expectedPassword ||
        !safeEqual(username, expectedUsername) ||
        !safeEqual(password, expectedPassword)
      ) {
        return NextResponse.json(
          { error: "Invalid guide credentials." },
          { status: 401 }
        );
      }
    } else {
      // Authenticate customers using their Supabase email account.
      const email =
        typeof body.email === "string"
          ? body.email.trim().toLowerCase()
          : "";

      if (!email) {
        return NextResponse.json(
          { error: "Enter your email address." },
          { status: 400 }
        );
      }

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
      );

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user || !data.session) {
        return NextResponse.json(
          {
            error:
              "Sign-in failed. Check your email and password, and confirm your email address if required.",
          },
          { status: 401 }
        );
      }

      username = data.user.email || email;
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
