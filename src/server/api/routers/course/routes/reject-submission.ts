import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import getUsername from "@/lib/get-username";

export default publicProcedure
  .input(
    z.object({
      ids: z.string().array(),
      assignmentId: z.string(),
      userId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const submissions = await db.assignmentSubmission.findMany({
        where: { id: { in: input.ids }, assignmentId: input.assignmentId },
        include: { assignment: { include: { course: true } }, user: true },
      });

      await db.assignmentSubmission.deleteMany({
        where: { id: { in: input.ids }, assignmentId: input.assignmentId },
      });

      const usernames = submissions.map(
        (submission) => submission.user.username,
      );

      const username = await getUsername(input.userId);

      const report = `In course \`${
        submissions?.[0]?.assignment?.course?.name ?? "Unknown"
      }\` the following users' submissions to assignment \`${
        submissions?.[0]?.assignment?.title ?? "Unknown"
      }\` have been rejected: ${new Intl.ListFormat("en", {
        type: "conjunction",
        style: "long",
      }).format(usernames)}`;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Assignment Rejections",
          description: report,
        },
      });
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
