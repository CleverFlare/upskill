import {
  type NextFetchEvent,
  type NextRequest,
  type NextResponse,
} from "next/server";
import {
  default as Authentication,
  matcher as AuthenticationMatcher,
} from "@/middleware/auth";

export interface middlewareType {
  middleware: (
    req: NextRequest,
    _next: NextFetchEvent,
  ) => Promise<NextResponse>;
  matcher?: string | null | undefined;
}

export const middleware: middlewareType[] = [
  {
    middleware: Authentication as (
      req: NextRequest,
      _next: NextFetchEvent,
    ) => Promise<NextResponse>,
    matcher: AuthenticationMatcher,
  },
  // {
  //     middleware: Logging,
  //     matcher: AuthenticationMatcher
  // },
];
