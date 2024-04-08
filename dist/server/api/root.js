"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCaller = exports.appRouter = void 0;
const trpc_1 = require("@/server/api/trpc");
const index_1 = __importDefault(require("./routers/course/index"));
const index_2 = __importDefault(require("./routers/auth/index"));
const user_1 = __importDefault(require("./routers/user"));
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
exports.appRouter = (0, trpc_1.createTRPCRouter)({
    course: index_1.default,
    auth: index_2.default,
    user: user_1.default,
});
exports.createCaller = (0, trpc_1.createCallerFactory)(exports.appRouter);
