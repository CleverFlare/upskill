import { globalTabs } from "@/app/global-tabs";
import { env } from "@/env";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const token = await getToken({ req: request, secret: env.NEXTAUTH_SECRET });
  const pathArray = nextUrl.pathname
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/");

  let isAllowed = false;

  const pathMatches = (pattern: string | RegExp) => {
    if (typeof pattern === "string") {
      return nextUrl.pathname === pattern;
    } else if (pattern instanceof RegExp) {
      const patternRoslvedValue = pattern.test(nextUrl.pathname);
      return patternRoslvedValue;
    }
    return false;
  };

  for (const { activeOn, href, permissions } of globalTabs) {
    let isCurrentPath = false;

    const currentPath = `/${pathArray[0]}/${pathArray[1]}${href.replace(
      /\/$/g,
      "",
    )}`;

    // Check if the current path matches the 'path' prop
    if (nextUrl.pathname && currentPath === nextUrl.pathname) {
      isCurrentPath = true;
    }

    // Check if the current path matches any item in the 'activeOn' prop array
    if (activeOn && Array.isArray(activeOn)) {
      for (const pattern of activeOn) {
        const patternMatched = pathMatches(pattern);
        if (patternMatched) {
          isCurrentPath = true;
        }
      }
    }

    if (
      isCurrentPath &&
      permissions.includes(token?.user.role ?? ("unknown" as "student"))
    )
      isAllowed = true;
  }

  if (!isAllowed)
    return NextResponse.redirect(new URL("/not-found", request.url));
}

export const matcher = "/workspace/(?!admin)";
