import { PrismaClient } from "@prisma/client";
import { env } from "@/env";
import ImageKit from "imagekit";
import saveBase64Image from "@/lib/save-image";
import deleteFile from "@/lib/delete-file";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

interface ImageKitUploadOptionsMock {
  file: string;
  fileName: string;
  folder: string;
}

let imagekit: ImageKit = {
  upload: async function ({
    file,
    fileName,
    folder,
  }: ImageKitUploadOptionsMock) {
    await saveBase64Image(
      file,
      `../../../../../../../public${folder}${fileName}`,
    );
    return {
      url: `${folder}${fileName}`,
      fileId: `${folder}${fileName}`,
    };
  },
  deleteFile: (id: string) => deleteFile(`../../../../../../../public${id}`),
} as ImageKit;

if (env.NODE_ENV === "production")
  imagekit = new ImageKit({
    publicKey: env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint: env.IMAGE_KIT_URL,
  });

export { imagekit };
