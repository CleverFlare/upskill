"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
async function deleteFile(filePath) {
    try {
        // Resolve the complete file path relative to the project root
        const publicFolderPath = path_1.default.join(__dirname, "public");
        await fs_1.promises.unlink(path_1.default.join(publicFolderPath, filePath));
    }
    catch (error) {
        console.error(`Error deleting file: ${filePath}`, error);
        throw error; // Re-throw the error for further handling if needed
    }
}
exports.default = deleteFile;
