import * as fs from "fs";
import * as path from "path";

interface ImageData {
  contentType: string;
  data: Buffer;
}

function extractImageData(base64Image: string): ImageData {
  const parts = base64Image.split(";base64,");
  if (parts.length !== 2) {
    throw new Error("Invalid base64 image format");
  }
  const contentType = parts[0]!.split(":")[1]!;
  const data = Buffer.from(parts[1]!, "base64");
  return { contentType, data };
}

async function saveBase64Image(
  base64Image: string,
  filePath: string,
): Promise<string> {
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

export default saveBase64Image;
