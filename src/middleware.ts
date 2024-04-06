import { type NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware({
  url,
  nextUrl,
  nextauth: { token },
}: NextRequestWithAuth) {
  // admin panel logic
  const isAdmin = token?.user.role === "admin";
  const isAdminPanel = nextUrl.pathname.startsWith("/workspace/admin");
  if (!isAdmin && isAdminPanel)
    return NextResponse.rewrite(new URL("/not-found", url));
});

export const config = { matcher: ["/workspace/:path*"] };
