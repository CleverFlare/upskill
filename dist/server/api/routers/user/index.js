"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("@/server/api/trpc");
const get_instructors_1 = __importDefault(require("./routers/get-instructors"));
const userRouter = (0, trpc_1.createTRPCRouter)({
    getInstructors: get_instructors_1.default,
});
exports.default = userRouter;
