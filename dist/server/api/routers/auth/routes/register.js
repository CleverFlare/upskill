"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = __importDefault(require("@/schema/register"));
const trpc_1 = require("@/server/api/trpc");
const db_1 = require("@/server/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = trpc_1.publicProcedure
    .input(register_1.default)
    .mutation(async ({ input }) => {
    const { birthDay, password, ...restInput } = input;
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const createdUser = await db_1.db.user.create({
        data: {
            ...restInput,
            birthDay: birthDay.toISOString(),
            password: hashedPassword,
        },
    });
    return createdUser;
});
