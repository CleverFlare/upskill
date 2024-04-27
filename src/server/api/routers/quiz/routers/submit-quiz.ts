import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import getUsername from "@/lib/get-username";

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
      userId: z.string(),
      answers: z.object({ questionId: z.string(), answer: z.string() }).array(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const { user, quiz } = await db.userQuiz.create({
        data: {
          quizId: input.id,
          userId: input.userId,
          answers: {
            createMany: {
              data: [
                ...input.answers.map((answer) => ({
                  questionId: answer.questionId,
                  userId: input.userId,
                  answer: answer.answer,
                })),
              ],
            },
          },
        },
        include: {
          user: true,
          quiz: {
            include: {
              course: true,
            },
          },
        },
      });

      const username = user.username;

      const report = `In course \`${quiz.course.name}\` the student \`${username}\` have submitted their answers to the quiz \`${quiz.name}\``;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Quiz Submission",
          description: report,
        },
      });
    } catch (err) {
      console.log("ERROR:", err);
      throw err;
    }
  });
