import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export default publicProcedure
  .input(
    z.object({
      title: z.string(),
      content: z.string(),
      dueDate: z.string(),
      courseId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      await db.assignment.create({
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
      });
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
