import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import getUsername from "@/lib/get-username";

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
      userId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const assignment = await db.assignment.delete({
        where: { id: input.id },
        include: { course: true },
      });

      const username = await getUsername(input.userId);

      const report = `In course \`${
        assignment.course.name ?? "Unknown"
      }\` an announcement with the title \`${
        assignment?.title ?? "Unknown"
      }\` has been deleted`;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Delete Assignment",
          description: report,
        },
      });
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
