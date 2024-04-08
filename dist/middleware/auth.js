"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matcher = void 0;
const middleware_1 = require("next-auth/middleware");
const server_1 = require("next/server");
exports.default = (req, _next) => (0, middleware_1.withAuth)(async function middleware({ url, nextUrl, nextauth: { token }, }) {
    const { origin } = new URL(url);
    // admin panel logic
    const isAdmin = (token === null || token === void 0 ? void 0 : token.user.role) === "admin";
    const isAdminPanel = nextUrl.pathname.startsWith("/workspace/admin");
    if (!isAdmin && isAdminPanel)
        return server_1.NextResponse.rewrite(new URL("/not-found", url));
    // handle unregistered course access
    const isWorkspaceCourseRoute = /\/workspace\/+/g.test(nextUrl.pathname);
    if (!isWorkspaceCourseRoute || isAdmin)
        return server_1.NextResponse.next();
    const courseId = nextUrl.pathname.replace(/^\/|\/$/g, "").split("/");
    const hasCourseReqData = {
        courseId,
        userId: token === null || token === void 0 ? void 0 : token.user.id,
    };
    const hasCourseRes = await fetch(origin + "/api/has-course", {
        method: "POST",
        body: JSON.stringify(hasCourseReqData),
    });
    const hasCourse = hasCourseRes.ok;
    if (!hasCourse)
        return server_1.NextResponse.redirect(new URL("/not-found", url));
})(req, _next);
exports.matcher = "/(workspace|workspace/+)";
