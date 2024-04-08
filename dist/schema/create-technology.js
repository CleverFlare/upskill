"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createTechnologySchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    logo: zod_1.z.instanceof(Blob, { message: "Required" }),
});
exports.default = createTechnologySchema;
