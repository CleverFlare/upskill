import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export default publicProcedure
  .input(
    z.object({
      courseId: z.string(),
      name: z.string(),
      deadline: z.string(),
      questions: z
        .object({
          statement: z.string(),
          points: z.number(),
          options: z.string().array().min(4).max(4),
          correct: z.number(),
        })
        .array(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const quiz = await db.quiz.create({
        data: {
          deadline: input.deadline,
          name: input.name,
          course: {
            connect: {
              id: input.courseId,
            },
          },
        },
      });

      for (const { options, points, correct, statement } of input.questions) {
        const optionsRecords = [];

        for (const option of options) {
          const record = await db.quizOption.create({
            data: {
              body: option,
            },
          });

          optionsRecords.push(record);
        }

        await db.quizQuestion.create({
          data: {
            points,
            options: {
              connect: optionsRecords.map((option) => ({ id: option.id })),
            },
            statement,
            correct: optionsRecords[correct]!.id,
            quiz: {
              connect: {
                id: quiz.id,
              },
            },
          },
        });
      }
    } catch (err) {
      console.log("ERROR:", err);
      throw err;
    }
  });
