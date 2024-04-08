"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("@/server/api/trpc");
const create_1 = __importDefault(require("./routes/create"));
const update_1 = __importDefault(require("./routes/update"));
const delete_1 = __importDefault(require("./routes/delete"));
const create_announcement_1 = __importDefault(require("./routes/create-announcement"));
const delete_announcement_1 = __importDefault(require("./routes/delete-announcement"));
const on_test_1 = __importDefault(require("./routes/on-test"));
const courseRouter = (0, trpc_1.createTRPCRouter)({
    create: create_1.default,
    update: update_1.default,
    delete: delete_1.default,
    createAnnouncement: create_announcement_1.default,
    deleteAnnouncement: delete_announcement_1.default,
    onTest: on_test_1.default,
});
exports.default = courseRouter;
