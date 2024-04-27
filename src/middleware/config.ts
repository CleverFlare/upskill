import {
  type NextFetchEvent,
  type NextRequest,
  type NextResponse,
} from "next/server";
import {
  default as Authentication,
  matcher as AuthenticationMatcher,
} from "@/middleware/auth";
import {
  default as CourseDetails,
  matcher as CourseDetailsMatcher,
} from "@/middleware/course-details";
import {
  default as ProtectedRoutes,
  matcher as ProtectedRoutesMatcher,
} from "./protected-routes";

export interface middlewareType {
  middleware: (
    req: NextRequest,
    _next: NextFetchEvent,
  ) => Promise<NextResponse<unknown> | void | undefined>;
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
  {
    middleware: CourseDetails,
    matcher: CourseDetailsMatcher,
  },
  {
    middleware: ProtectedRoutes,
    matcher: ProtectedRoutesMatcher,
  },
];
