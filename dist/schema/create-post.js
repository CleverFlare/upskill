"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createPostSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, { message: "Required" }),
    content: zod_1.z.string().min(3, { message: "Required" }),
    image: zod_1.z.instanceof(Blob, { message: "Required" }).optional(),
});
exports.default = createPostSchema;
