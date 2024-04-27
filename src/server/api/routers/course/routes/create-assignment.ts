import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import getUsername from "@/lib/get-username";

export default publicProcedure
  .input(
    z.object({
      title: z.string(),
      content: z.string(),
      dueDate: z.string(),
      courseId: z.string(),
      userId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const assignment = await db.assignment.create({
        data: {
          title: input.title,
          content: input.content,
          dueDate: input.dueDate,
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
        assignment?.course?.name ?? "Unknown"
      }\` an assignment has been created with the title \`${
        assignment?.title ?? "Unknown"
      }\``;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Create Class",
          description: report,
        },
      });
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
