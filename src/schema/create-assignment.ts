import { z } from "zod";

const createAssignmentSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  content: z.string().min(1, { message: "Required" }),
  dueDate: z.instanceof(Date, { message: "Required" }),
});

export default createAssignmentSchema;
