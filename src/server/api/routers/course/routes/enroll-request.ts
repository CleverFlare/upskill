import getUsername from "@/lib/get-username";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

export default publicProcedure
  .input(z.object({ id: z.string(), courseId: z.string() }))
  .mutation(async ({ input }) => {
    try {
      const enrollRequest = await db.userCourse.create({
        data: {
          userId: input.id,
          courseId: input.courseId,
          role: "student",
        },
        include: { course: true },
      });

      const username = await getUsername(input.id);

      const report = `User \`${username}\` requested to enroll in course \`${
        enrollRequest?.course?.name ?? "Unknown"
      }\``;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Enroll Request",
          description: report,
        },
      });
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
