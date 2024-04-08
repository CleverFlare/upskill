"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagekit = exports.db = void 0;
const client_1 = require("@prisma/client");
const env_1 = require("@/env");
const imagekit_1 = __importDefault(require("imagekit"));
const save_image_1 = __importDefault(require("@/lib/save-image"));
const delete_file_1 = __importDefault(require("@/lib/delete-file"));
const globalForPrisma = globalThis;
exports.db = (_a = globalForPrisma.prisma) !== null && _a !== void 0 ? _a : new client_1.PrismaClient({
    log: env_1.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});
if (env_1.env.NODE_ENV !== "production")
    globalForPrisma.prisma = exports.db;
let imagekit = {
    upload: async function ({ file, fileName, folder, }) {
        await (0, save_image_1.default)(file, `../../../../../../../public${folder}${fileName}`);
        return {
            url: `${folder}${fileName}`,
            fileId: `${folder}${fileName}`,
        };
    },
    deleteFile: (id) => (0, delete_file_1.default)(`../../../../../../../public${id}`),
};
exports.imagekit = imagekit;
if (env_1.env.NODE_ENV === "production")
    exports.imagekit = imagekit = new imagekit_1.default({
        publicKey: env_1.env.IMAGE_KIT_PUBLIC_KEY,
        privateKey: env_1.env.IMAGE_KIT_PRIVATE_KEY,
        urlEndpoint: env_1.env.IMAGE_KIT_URL,
    });
