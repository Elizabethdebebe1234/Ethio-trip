import { NextResponse } from "next/server";

export function proxy(request) {
  const session = request.cookies.get("ethio_trip_session")?.value;

  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/customer/:path*", "/guide/:path*"],
};
