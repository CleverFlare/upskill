"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matcher = void 0;
const env_1 = require("@/env");
const jwt_1 = require("next-auth/jwt");
const server_1 = require("next/server");
async function middleware(request) {
    // const mutate = api.;
    const url = new URL(request.url);
    const session = await (0, jwt_1.getToken)({ req: request, secret: env_1.env.NEXTAUTH_SECRET });
    if (!session)
        return;
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
        return server_1.NextResponse.redirect(new URL(`/workspace/${courseId}`, request.url));
}
exports.default = middleware;
exports.matcher = "/courses/+";
