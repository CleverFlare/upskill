import { z } from "zod";

const createQuizSchema = z.object({
  name: z.string().min(3, { message: "Required" }),
  deadlineDate: z.instanceof(Date, { message: "Required" }),
  deadlineTime: z.string(),
  questions: z
    .object({
      statement: z.string().min(3, { message: "Required" }),
      points: z.number().gt(0, { message: "Required" }),
      options: z.string().min(3, { message: "Required" }).array().min(4).max(4),
      correct: z.number(),
    })
    .array()
    .nonempty(),
});

export default createQuizSchema;
