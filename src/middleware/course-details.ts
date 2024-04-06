import { env } from "@/env";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  // const mutate = api.;
  const url = new URL(request.url);
  const session = await getToken({ req: request, secret: env.NEXTAUTH_SECRET });

  if (!session) return;

  const isAdmin = session.user.role === "admin";
  const courseId = request.nextUrl.pathname
    .replace(/^\/|\/$/g, "")
    .split("/")[1];

  const hasCourseRes = await fetch(url.origin + "/api/has-course", {
    method: "POST",
    body: JSON.stringify({ courseId, userId: session.user.id }),
  });

  const hasCourse = hasCourseRes.ok;

  console.log(hasCourseRes.status);

  if (hasCourse || isAdmin)
    return NextResponse.redirect(
      new URL(`/workspace/${courseId}`, request.url),
    );
}

export const matcher = "/courses/+";
