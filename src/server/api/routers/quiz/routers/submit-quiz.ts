import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

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
      await db.userQuiz.create({
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
      });
    } catch (err) {
      console.log("ERROR:", err);
      throw err;
    }
  });
