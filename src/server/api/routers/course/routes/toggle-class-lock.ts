import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db, imagekit } from "@/server/db";
import { pusher } from "@/server/pusher";
import getUsername from "@/lib/get-username";

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
      courseId: z.string(),
      locked: z.boolean(),
      userId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const firstCourse = await db.class.findFirst({
        where: { courseId: input.courseId },
      });

      if (firstCourse?.id === input.id) return;

      const courseClass = await db.class.update({
        where: {
          id: input.id,
          courseId: input.courseId,
        },
        data: {
          locked: input.locked,
        },
        include: {
          course: true,
        },
      });

      const username = await getUsername(input.userId);

      const report = `In course \`${
        courseClass?.course?.name ?? "Unknown"
      }\` class \`${courseClass?.title ?? "Unknown"}\` has been ${
        input.locked ? "locked" : "unlocked"
      }`;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Toggle Class Lock",
          description: report,
        },
      });
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
