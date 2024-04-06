import { type NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { type NextFetchEvent, NextResponse } from "next/server";

export default (req: NextRequestWithAuth, _next: NextFetchEvent) =>
  withAuth(async function middleware({
    url,
    nextUrl,
    nextauth: { token },
  }: NextRequestWithAuth) {
    const { origin } = new URL(url);
    // admin panel logic
    const isAdmin = token?.user.role === "admin";
    const isAdminPanel = nextUrl.pathname.startsWith("/workspace/admin");
    if (!isAdmin && isAdminPanel)
      return NextResponse.rewrite(new URL("/not-found", url));

    // handle unregistered course access
    const isWorkspaceCourseRoute = /\/workspace\/+/g.test(nextUrl.pathname);
    if (!isWorkspaceCourseRoute || isAdmin) return NextResponse.next();
    const courseId = nextUrl.pathname.replace(/^\/|\/$/g, "").split("/");
    const hasCourseReqData = {
      courseId,
      userId: token?.user.id,
    };

    const hasCourseRes = await fetch(origin + "/api/has-course", {
      method: "POST",
      body: JSON.stringify(hasCourseReqData),
    });

    const hasCourse = hasCourseRes.ok;

    if (!hasCourse) return NextResponse.redirect(new URL("/not-found", url));
  })(req, _next);

export const matcher = "/(workspace|workspace/+)";
