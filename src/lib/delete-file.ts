import { promises as fs } from "fs";
import path from "path";

export default async function deleteFile(filePath: string): Promise<void> {
  try {
    // Resolve the complete file path relative to the project root
    const publicFolderPath = path.join(__dirname, "public");
    await fs.unlink(path.join(publicFolderPath, filePath));
  } catch (error) {
    console.error(`Error deleting file: ${filePath}`, error);
    throw error; // Re-throw the error for further handling if needed
  }
}
