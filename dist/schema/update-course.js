"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const updateCourseSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: "Course name is required" })
        .min(1, { message: "Course name is required" }),
    thumbnail: zod_1.z.union([
        zod_1.z.instanceof(Blob, { message: "The thumbnail is required" }),
        zod_1.z.string(),
    ]),
    banner: zod_1.z.union([
        zod_1.z.instanceof(Blob, { message: "The banner is required" }),
        zod_1.z.string(),
    ]),
    description: zod_1.z
        .string({ required_error: "The description is required" })
        .min(1, { message: "The description is required" }),
    prerequisites: zod_1.z.string().array(),
    technologies: zod_1.z
        .record(zod_1.z.string(), zod_1.z.object({
        name: zod_1.z.string(),
        logo: zod_1.z.union([zod_1.z.instanceof(Blob), zod_1.z.string()]),
        logoId: zod_1.z.string().optional(),
    }))
        .refine((data) => Object.keys(data).length > 0, {
        message: "Record must contain at least one technology",
    }),
    instructors: zod_1.z
        .object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        username: zod_1.z.string(),
        role: zod_1.z.string(),
        image: zod_1.z.union([zod_1.z.string().optional(), zod_1.z.undefined(), zod_1.z.null()]),
    })
        .array(),
});
exports.default = updateCourseSchema;
