import path from "path";
import fs from "fs";

export default function saveImage(
  image: Buffer,
  filePath: string,
): Promise<void> {
  // Validate input data (optional)
  if (!image || !filePath) {
    throw new Error("Missing required arguments: image and filePath");
  }

  // Get the full path for the image in the public directory
  const fullPath = path.join(__dirname, "./public", filePath);

  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(fullPath);

    // Handle errors during file creation
    writeStream.on("error", (err) => {
      reject(err);
    });

    // Write the image data to the stream
    writeStream.write(image);

    // Handle successful write operation (optional)
    writeStream.on("finish", () => {
      console.log("Image saved successfully:", filePath);
      resolve();
    });

    // Close the stream (important)
    writeStream.close();
  });
}
