import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
      userId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const userQuiz = await db.userQuiz.findFirst({
        where: {
          quizId: input.id,
          userId: input.userId,
        },
        include: {
          answers: {
            include: {
              question: true,
            },
          },
        },
      });

      let points = 0;

      if (!userQuiz?.answers?.length) return;

      for (const { answer, question } of userQuiz.answers) {
        const answerPoints = question.points;
        const correctAnswer = question.correct;

        if (correctAnswer === answer) points += answerPoints;
      }

      await db.userCourse.update({
        where: { userId: input.userId },
        data: { points: { increment: points } },
      });

      await db.userQuiz.update({
        where: {
          id: userQuiz.id,
        },
        data: { collected: true },
      });
    } catch (err) {
      console.log("ERROR:", err);
      throw err;
    }
  });
