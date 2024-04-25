import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
      userId: z.string(),
      link: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const assignmentData = await db.assignment.findUnique({
        where: { id: input.id },
      });

      if (
        !assignmentData?.dueDate ||
        new Date() > new Date(assignmentData.dueDate)
      )
        return;

      await db.assignmentSubmission.create({
        data: {
          link: input.link,
          assignment: {
            connect: {
              id: input.id,
            },
          },
          user: {
            connect: {
              id: input.userId,
            },
          },
        },
      });
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
