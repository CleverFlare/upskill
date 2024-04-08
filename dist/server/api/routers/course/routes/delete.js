"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("@/server/api/trpc");
const db_1 = require("@/server/db");
const zod_1 = require("zod");
exports.default = trpc_1.publicProcedure
    .input(zod_1.z.object({ id: zod_1.z.string() }))
    .mutation(async ({ input }) => {
    const deletedCourse = await db_1.db.course.delete({ where: { id: input.id } });
    if (!deletedCourse)
        throw Error("Invalid ID");
    await db_1.imagekit.deleteFile(deletedCourse.bannerId);
    await db_1.imagekit.deleteFile(deletedCourse.thumbnailId);
    await Promise.all(deletedCourse.technologies.map(async (tech) => await db_1.imagekit.deleteFile(tech.logoId)));
});
