import getUsername from "@/lib/get-username";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

export default publicProcedure
  .input(
    z.object({
      type: z.enum(["addition", "subtraction"]),
      ids: z.string().array().nonempty(),
      number: z.number(),
      courseId: z.string(),
      userId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const users = await db.userCourse.findMany({
        where: { userId: { in: input.ids }, courseId: input.courseId },
        include: {
          course: true,
          user: true,
        },
      });

      await db.userCourse.updateMany({
        where: { userId: { in: input.ids }, courseId: input.courseId },
        data: {
          points: {
            ...(input.type === "addition" && { increment: input.number }),
            ...(input.type === "subtraction" && { decrement: input.number }),
          },
        },
      });

      const usernames = users.map((user) => `\`${user.user.username}\``);

      const username = await getUsername(input.userId);

      const report = `In course \`${users?.[0]?.course?.name ?? "Unknown"}\` ${
        input.number
      } points in amount have been ${
        input.type === "addition" ? "added" : "subtracted"
      } for the following students: ${new Intl.ListFormat("en", {
        style: "long",
        type: "conjunction",
      }).format(usernames)}`;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Modify Points",
          description: report,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
