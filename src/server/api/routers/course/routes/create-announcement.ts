import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db, imagekit } from "@/server/db";

export default publicProcedure
  .input(
    z.object({
      courseId: z.string(),
      title: z.string(),
      content: z.string(),
      image: z.string().optional(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    try {
      const randomUUID = crypto.randomUUID();
      const image = input?.image
        ? await imagekit.upload({
            file: input.image,
            fileName: `${randomUUID}.jpg`,
            folder: "/announcements/",
          })
        : undefined;

      const announcement = await db.announcement.create({
        data: {
          course: {
            connect: {
              id: input.courseId,
            },
          },
          ...(!!image ? { image: image?.url, imageId: image?.fileId } : {}),
          title: input.title,
          content: input.content,
          createdAt: new Date(),
        },
      });

      ctx.ee.emit("TEST");

      return {
        title: announcement.title,
        content: announcement.content,
        image: announcement.image,
        createdAt: announcement.createdAt.toISOString(),
      };
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
