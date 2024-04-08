"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("@/server/api/trpc");
const register_1 = __importDefault(require("./routes/register"));
const courseRouter = (0, trpc_1.createTRPCRouter)({
    register: register_1.default,
});
exports.default = courseRouter;
