import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerAuthSession } from "./server/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await getServerAuthSession();
  if (!session) return NextResponse.redirect(new URL("/", request.url));
  const isAdmin = session.user.role === "admin";
  const isAdminPanel = request.nextUrl.pathname.startsWith("/workspace/admin");

  return NextResponse.redirect(new URL("/", request.url));

  // if (!isAdmin && isAdminPanel)
  //   return NextResponse.rewrite(new URL("/not-found", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/workspace/:path*"],
};
