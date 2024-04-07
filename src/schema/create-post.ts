import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(3, { message: "Required" }),
  content: z.string().min(3, { message: "Required" }),
  image: z.instanceof(Blob, { message: "Required" }).optional(),
});

export default createPostSchema;
