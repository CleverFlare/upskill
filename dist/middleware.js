"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.middleware = void 0;
const config_1 = require("@/middleware/config");
const server_1 = require("next/server");
async function middleware(req, _next) {
    // Load middleware functions
    const middlewareFunctions = config_1.middleware
        .filter((m) => !m.matcher ||
        (!!m.matcher && new RegExp(m.matcher).test(req.nextUrl.toString())))
        .map((m) => m.middleware(req, _next));
    // Option 1: Run middleware synchronously
    // This allows you to handle each result before moving to the next
    for (const fn of middlewareFunctions) {
        const result = await fn;
        if (!result || !result.ok) {
            return result;
        }
    }
    // const nextUrl = req.nextUrl.pathname
    return server_1.NextResponse.next();
    // Option 2: Run middleware asynchronously
    // Using Promise.allSettled allows concurrent execution
    /*
      const results = await Promise.allSettled(middlewareFunctions);
  
      // Check each result
      for (const result of results) {
          // If rejected or not OK, return first response
          if (result.status === "fulfilled" && !result.value?.ok) {
              return result.value;
          } else if (result.status === "rejected") {
              throw result.reason
          }
      }
  
      return NextResponse.next();
      */
}
exports.middleware = middleware;
exports.config = {
    matcher: "/((?!api|static|.*\\..*|_next).*)",
};
