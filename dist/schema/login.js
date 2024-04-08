"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const LoginSchema = zod_1.z.object({
    username: zod_1.z
        .string({ required_error: "Username is required" })
        .min(1, { message: "Username is required" }),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*[A-Z]).*$/, {
        message: "Password must at least contain one capital character",
    })
        .regex(/^(?=.*[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).*$/gi, {
        message: "Password must at least contain one special character",
    }),
});
exports.default = LoginSchema;
