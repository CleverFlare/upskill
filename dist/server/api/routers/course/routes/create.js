"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const trpc_1 = require("@/server/api/trpc");
const db_1 = require("@/server/db");
exports.default = trpc_1.publicProcedure
    .input(zod_1.z.object({
    thumbnail: zod_1.z.string(),
    banner: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    technologies: zod_1.z.object({ logo: zod_1.z.string(), name: zod_1.z.string() }).array(),
    prerequisites: zod_1.z.string().array(),
    instructors: zod_1.z
        .object({ id: zod_1.z.string(), role: zod_1.z.string() })
        .array()
        .nonempty(),
}))
    .mutation(async ({ input }) => {
    try {
        const technologyLogos = input.technologies.map(({ logo }) => logo);
        const uploadedThumbnail = await db_1.imagekit.upload({
            file: input.thumbnail,
            fileName: `${crypto.randomUUID()}.jpg`,
            folder: "/thumbnails/",
        });
        const uploadedBanner = await db_1.imagekit.upload({
            file: input.banner,
            fileName: `${crypto.randomUUID()}.jpg`,
            folder: "/banners/",
        });
        const uploadedTechnologyLogos = await Promise.all(technologyLogos.map((logo) => db_1.imagekit.upload({
            file: logo,
            fileName: `${crypto.randomUUID()}.png`,
            folder: "/technologies/",
        })));
        const instructorRelations = input.instructors.map(({ role, id }) => ({
            userId: id,
            role,
        }));
        const createdCourse = await db_1.db.course.create({
            data: {
                banner: uploadedBanner.url,
                bannerId: uploadedBanner.fileId,
                thumbnail: uploadedThumbnail.url,
                thumbnailId: uploadedThumbnail.fileId,
                technologies: input.technologies.map(({ name }, index) => {
                    var _a, _b, _c, _d;
                    return ({
                        name,
                        logoUrl: (_b = (_a = uploadedTechnologyLogos[index]) === null || _a === void 0 ? void 0 : _a.url) !== null && _b !== void 0 ? _b : "",
                        logoId: (_d = (_c = uploadedTechnologyLogos[index]) === null || _c === void 0 ? void 0 : _c.fileId) !== null && _d !== void 0 ? _d : "",
                    });
                }),
                name: input.name,
                description: input.description,
                prerequisites: input.prerequisites,
                users: {
                    createMany: {
                        data: instructorRelations,
                    },
                },
            },
        });
        return createdCourse;
    }
    catch (err) {
        console.log("something went wrong!", err);
        throw Error("Something went wrong!");
    }
});
