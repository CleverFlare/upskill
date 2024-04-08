"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("@/server/api/trpc");
const db_1 = require("@/server/db");
const zod_1 = require("zod");
exports.default = trpc_1.publicProcedure.input(zod_1.z.string()).mutation(async ({ input }) => {
    console.log(input);
    const instructors = await db_1.db.user.findMany({
        where: {
            role: "instructor",
            OR: [
                {
                    firstName: {
                        startsWith: input,
                    },
                },
                {
                    lastName: {
                        startsWith: input,
                    },
                },
                {
                    username: {
                        startsWith: input,
                    },
                },
            ],
        },
        select: {
            id: true,
            image: true,
            firstName: true,
            lastName: true,
            username: true,
        },
        take: 10,
    });
    console.log(instructors);
    return instructors;
});
