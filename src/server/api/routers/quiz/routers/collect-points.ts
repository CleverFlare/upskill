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
      const userQuiz = await db.userQuiz.findFirst({
        where: {
          quizId: input.id,
          userId: input.userId,
        },
        include: {
          quiz: {
            include: {
              course: true,
            },
          },
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

      const username = await getUsername(input.userId);

      const report = `In course \`${userQuiz.quiz.course.name}\` user \`${username}\` has claimed his points on quiz \`${userQuiz.quiz.name}\``;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Create Quiz",
          description: report,
        },
      });
    } catch (err) {
      console.log("ERROR:", err);
      throw err;
    }
  });
