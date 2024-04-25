import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      await db.assignment.delete({
        where: { id: input.id },
      });
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
