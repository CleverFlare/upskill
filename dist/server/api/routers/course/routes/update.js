"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const trpc_1 = require("@/server/api/trpc");
const db_1 = require("@/server/db");
const lodash_1 = __importDefault(require("lodash"));
// import { Prisma, UserCourse } from "@prisma/client";
exports.default = trpc_1.publicProcedure
    .input(zod_1.z.object({
    id: zod_1.z.string(),
    thumbnail: zod_1.z.string().optional(),
    banner: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    technologies: zod_1.z
        .object({
        logo: zod_1.z.string(),
        name: zod_1.z.string(),
        logoId: zod_1.z.string().optional(),
    })
        .array()
        .optional(),
    prerequisites: zod_1.z.string().array().optional(),
    instructors: zod_1.z
        .object({ id: zod_1.z.string(), role: zod_1.z.string() })
        .array()
        .optional(),
}))
    .mutation(async ({ input }) => {
    // console.log(input);
    const course = await db_1.db.course.findUnique({ where: { id: input.id } });
    if (!course)
        throw Error("Invalid ID!");
    let modifiedData = {};
    const deletedTechnologies = (input === null || input === void 0 ? void 0 : input.technologies)
        ? lodash_1.default.differenceWith(course.technologies, input.technologies, (obj1, obj2) => lodash_1.default.isEqual(obj1, obj2))
        : undefined;
    if (deletedTechnologies)
        await Promise.all(deletedTechnologies.map(async (tech) => await db_1.imagekit.deleteFile(tech.logoId)));
    if (input === null || input === void 0 ? void 0 : input.technologies)
        modifiedData.technologies = await Promise.all(input.technologies.map(async (tech) => {
            if (tech === null || tech === void 0 ? void 0 : tech.logoId)
                return {
                    name: tech.name,
                    logoUrl: tech.logo,
                    logoId: tech.logoId,
                };
            const storedLogo = await db_1.imagekit.upload({
                file: tech.logo,
                fileName: `${crypto.randomUUID()}.png`,
                folder: "/technologies/",
            });
            return {
                name: tech.name,
                logoUrl: storedLogo.url,
                logoId: storedLogo.fileId,
            };
        }));
    if (input === null || input === void 0 ? void 0 : input.banner) {
        await db_1.imagekit.deleteFile(course.bannerId);
        const storedBanner = await db_1.imagekit.upload({
            file: input.banner,
            fileName: `${crypto.randomUUID()}.jpg`,
            folder: "/banners/",
        });
        modifiedData.banner = storedBanner.url;
        modifiedData.bannerId = storedBanner.fileId;
    }
    if (input === null || input === void 0 ? void 0 : input.thumbnail) {
        await db_1.imagekit.deleteFile(course.thumbnail);
        const storedThumbnail = await db_1.imagekit.upload({
            file: input.thumbnail,
            fileName: `${crypto.randomUUID()}.jpg`,
            folder: "/thumbnails/",
        });
        modifiedData.thumbnail = storedThumbnail.url;
        modifiedData.thumbnailId = storedThumbnail.fileId;
    }
    if (input === null || input === void 0 ? void 0 : input.instructors) {
        await db_1.db.userCourse.deleteMany({ where: { courseId: input.id } });
        const instructorRelations = input.instructors.map(({ role, id }) => ({
            userId: id,
            role,
        }));
        modifiedData.users = {
            createMany: {
                data: instructorRelations,
            },
        };
    }
    modifiedData = { ...input, ...modifiedData };
    delete modifiedData.id;
    delete modifiedData.instructors;
    return await db_1.db.course.update({
        where: { id: input.id },
        data: modifiedData,
    });
});
