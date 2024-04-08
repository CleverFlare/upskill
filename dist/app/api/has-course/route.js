"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const db_1 = require("@/server/db");
const server_1 = require("next/server");
const zod_1 = require("zod");
async function POST(request) {
    const validationSchema = zod_1.z.object({
        userId: zod_1.z.string(),
        courseId: zod_1.z.string(),
    });
    const body = (await request.json());
    const validation = await validationSchema.safeParseAsync(body);
    if (!validation.success)
        return server_1.NextResponse.json({ message: "Invalid Input" }, { status: 400 });
    const userCourse = await db_1.db.userCourse.findFirst({
        where: {
            userId: body.userId,
            courseId: body.courseId,
        },
    });
    if (!userCourse)
        return server_1.NextResponse.json({ message: "User doesn't have this course" }, { status: 401 });
    return server_1.NextResponse.json({ message: "User has this course" }, { status: 200 });
}
exports.POST = POST;
