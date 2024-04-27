import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db, imagekit } from "@/server/db";
import { pusher } from "@/server/pusher";
import getUsername from "@/lib/get-username";

export default publicProcedure
  .input(
    z.object({
      videoId: z.string(),
      title: z.string(),
      description: z.string(),
      resources: z.object({ name: z.string(), url: z.string() }).array(),
      courseId: z.string(),
      userId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const classes = await db.class.findMany({
        where: { courseId: input.courseId },
      });

      const isFirstClass = !classes.length;

      const courseClass = await db.class.create({
        data: {
          title: input.title,
          description: input.description,
          resources: input.resources,
          locked: isFirstClass ? false : true,
          videoId: input.videoId,
          course: {
            connect: {
              id: input.courseId,
            },
          },
        },
        include: {
          course: true,
        },
      });

      const username = await getUsername(input.userId);

      const report = `In course \`${
        courseClass?.course?.name ?? "Unknown"
      }\` a new class has been created with the title \`${
        courseClass?.title ?? "Unknown"
      }\``;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Create Announcement",
          description: report,
        },
      });
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
