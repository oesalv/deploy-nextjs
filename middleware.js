import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("familieplan_session")?.value;
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/dashboard", "/calendar", "/tasks", "/admin"];

  const isProtected = protectedPaths.some((path) =>
    pathname === path || pathname.startsWith(path + "/")
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/calendar/:path*", "/tasks/:path*", "/admin/:path*"],
};
