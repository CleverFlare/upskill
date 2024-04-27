import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import getUsername from "@/lib/get-username";

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

      const submission = await db.assignmentSubmission.create({
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
        include: {
          user: true,
          assignment: {
            include: {
              course: true,
            },
          },
        },
      });

      const username = await getUsername(input.userId);

      const report = `In course \`${
        submission?.assignment?.course?.name ?? "Unknown"
      }\` an assignment submission has been made to assignment \`${
        submission?.assignment?.title ?? "Unknown"
      }\``;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Assignment Submission",
          description: report,
        },
      });
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
