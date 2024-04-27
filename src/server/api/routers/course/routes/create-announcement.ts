import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db, imagekit } from "@/server/db";
import { pusher } from "@/server/pusher";
import getUsername from "@/lib/get-username";

export default publicProcedure
  .input(
    z.object({
      courseId: z.string(),
      title: z.string(),
      content: z.string(),
      image: z.string().optional(),
      userId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
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
        include: {
          course: true,
        },
      });

      await pusher.trigger(input.courseId, "notifications", {
        name: "announcements",
        notifications: 1,
      });

      const username = await getUsername(input.userId);

      const report = `In course \`${
        announcement.course.name ?? "Unknown"
      }\` an announcement has been created with the title \`${
        announcement.title
      }\``;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Create Assignment",
          description: report,
        },
      });

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
