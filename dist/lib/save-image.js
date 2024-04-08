"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function extractImageData(base64Image) {
    const parts = base64Image.split(";base64,");
    if (parts.length !== 2) {
        throw new Error("Invalid base64 image format");
    }
    const contentType = parts[0].split(":")[1];
    const data = Buffer.from(parts[1], "base64");
    return { contentType, data };
}
async function saveBase64Image(base64Image, filePath) {
    // Check if the public folder exists
    const publicFolderPath = path.join(__dirname, "public");
    if (!fs.existsSync(publicFolderPath)) {
        await fs.promises.mkdir(publicFolderPath);
    }
    const { contentType, data } = extractImageData(base64Image);
    // Validate content type (optional)
    if (!contentType.startsWith("image/")) {
        throw new Error("Invalid image content type");
    }
    const fullFilePath = path.join(publicFolderPath, filePath);
    // Write the decoded data to the file
    await fs.promises.writeFile(fullFilePath, data);
    return fullFilePath;
}
exports.default = saveBase64Image;
