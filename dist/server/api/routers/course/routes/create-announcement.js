"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const trpc_1 = require("@/server/api/trpc");
const db_1 = require("@/server/db");
exports.default = trpc_1.publicProcedure
    .input(zod_1.z.object({
    courseId: zod_1.z.string(),
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    image: zod_1.z.string().optional(),
}))
    .mutation(async ({ input, ctx }) => {
    try {
        const randomUUID = crypto.randomUUID();
        const image = (input === null || input === void 0 ? void 0 : input.image)
            ? await db_1.imagekit.upload({
                file: input.image,
                fileName: `${randomUUID}.jpg`,
                folder: "/announcements/",
            })
            : undefined;
        const announcement = await db_1.db.announcement.create({
            data: {
                course: {
                    connect: {
                        id: input.courseId,
                    },
                },
                ...(!!image ? { image: image === null || image === void 0 ? void 0 : image.url, imageId: image === null || image === void 0 ? void 0 : image.fileId } : {}),
                title: input.title,
                content: input.content,
                createdAt: new Date(),
            },
        });
        ctx.ee.emit("TEST");
        return {
            title: announcement.title,
            content: announcement.content,
            image: announcement.image,
            createdAt: announcement.createdAt.toISOString(),
        };
    }
    catch (err) {
        console.log(err);
        throw Error("Something went wrong!");
    }
});
