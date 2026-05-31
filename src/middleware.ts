import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin/* (but not /admin itself — that's the login page)
  if (pathname.startsWith("/admin/")) {
    const adminCookie = request.cookies.get("jmc_admin");
    const adminPassword = process.env.ADMIN_PASSWORD || "jmclimo2024";
    const expectedToken = Buffer.from(adminPassword).toString("base64");

    if (!adminCookie || adminCookie.value !== expectedToken) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path+"],
};
