"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const trpc_1 = require("@/server/api/trpc");
const db_1 = require("@/server/db");
exports.default = trpc_1.publicProcedure
    .input(zod_1.z.object({
    id: zod_1.z.string(),
}))
    .mutation(async ({ input }) => {
    try {
        const announcement = await db_1.db.announcement.delete({
            where: { id: input.id },
        });
        if (announcement.imageId)
            await db_1.imagekit.deleteFile(announcement.imageId);
        return announcement;
    }
    catch (err) {
        console.log(err);
        throw Error("Something went wrong!");
    }
});
