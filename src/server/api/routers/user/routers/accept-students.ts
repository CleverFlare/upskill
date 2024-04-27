import getUsername from "@/lib/get-username";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

export default publicProcedure
  .input(
    z.object({
      students: z.string().array().nonempty(),
      courseId: z.string(),
      userId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      await db.userCourse.updateMany({
        where: { userId: { in: input.students }, courseId: input.courseId },
        data: { isAccepted: true },
      });

      const users = await db.userCourse.findMany({
        where: {
          id: { in: input.students },
          courseId: input.courseId,
          isAccepted: true,
        },
        include: {
          user: true,
          course: true,
        },
      });

      const usernames = users.map((user) => `\`${user.user.username}\``);

      const username = await getUsername(input.userId);

      const report = `In course \`${
        users?.[0]?.course?.name ?? "Unknown"
      }\` the following users have been accepted: ${new Intl.ListFormat("en", {
        style: "long",
        type: "conjunction",
      }).format(usernames)}`;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Accept Students",
          description: report,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
