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
      const quiz = await db.quiz.delete({
        where: { id: input.id },
        include: {
          course: true,
        },
      });

      await db.userQuiz.deleteMany({ where: { quizId: input.id } });

      await db.quizOption.deleteMany({
        where: { quizQuestion: { quiz: { id: input.id } } },
      });

      await db.quizQuestion.deleteMany({ where: { quiz: { id: input.id } } });

      await db.userQuestion.deleteMany({
        where: { question: { quiz: { id: input.id } } },
      });

      const username = await getUsername(input.userId);

      const report = `In course \`${quiz.course.name}\` the quiz \`${quiz.name}\` have been deleted`;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Delete Quiz",
          description: report,
        },
      });
    } catch (err) {
      console.log("ERROR:", err);
      throw err;
    }
  });
