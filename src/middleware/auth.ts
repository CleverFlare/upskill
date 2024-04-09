import { env } from "@/env";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const session = await getToken({ req: request, secret: env.NEXTAUTH_SECRET });

  if (!session?.user)
    return NextResponse.redirect(new URL("/login", request.url));

  // admin panel logic
  const isAdmin = session?.user.role === "admin";
  const isAdminPanel = request.nextUrl.pathname.startsWith("/workspace/admin");
  if (!isAdmin && isAdminPanel)
    return NextResponse.rewrite(new URL("/not-found", url));

  // handle unregistered course access
  const isWorkspaceCourseRoute = /\/workspace\/+/g.test(
    request.nextUrl.pathname,
  );
  if (!isWorkspaceCourseRoute || isAdmin) return NextResponse.next();
  const courseId = request.nextUrl.pathname.replace(/^\/|\/$/g, "").split("/");
  const hasCourseReqData = {
    courseId,
    userId: session?.user.id,
  };

  const hasCourseRes = await fetch(origin + "/api/has-course", {
    method: "POST",
    body: JSON.stringify(hasCourseReqData),
  });

  const hasCourse = hasCourseRes.ok;

  if (!hasCourse) return NextResponse.redirect(new URL("/not-found", url));
}

export const matcher = "/(workspace|workspace/+)";
