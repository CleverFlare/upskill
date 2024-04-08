"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const RegisterSchema = zod_1.z.object({
    role: zod_1.z.enum(["student", "instructor"]),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    birthDay: zod_1.z.date(),
    gender: zod_1.z.enum(["male", "female"]),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().min(8),
    username: zod_1.z.string().min(1, { message: "Required" }),
    password: zod_1.z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*[A-Z]).*$/, {
        message: "Password must at least contain one capital character",
    })
        .regex(/^(?=.*[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).*$/gi, {
        message: "Password must at least contain one special character",
    }),
});
exports.default = RegisterSchema;
