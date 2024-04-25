import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export default publicProcedure
  .input(
    z.object({
      ids: z.string().array(),
      assignmentId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      await db.assignmentSubmission.deleteMany({
        where: { id: { in: input.ids }, assignmentId: input.assignmentId },
      });
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
