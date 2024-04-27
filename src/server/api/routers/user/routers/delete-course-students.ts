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
      const users = await db.userCourse.findMany({
        where: { userId: { in: input.students }, courseId: input.courseId },
        include: {
          user: true,
          course: true,
        },
      });

      await db.userCourse.deleteMany({
        where: { userId: { in: input.students }, courseId: input.courseId },
      });

      const usernames = users.map((user) => `\`${user.user.username}\``);

      const username = await getUsername(input.userId);

      const report = `In course \`${
        users?.[0]?.course?.name ?? "Unknown"
      }\` the following users have been expelled: ${new Intl.ListFormat("en", {
        style: "long",
        type: "conjunction",
      }).format(usernames)}`;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Expel Students",
          description: report,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
