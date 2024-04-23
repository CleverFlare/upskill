import { z } from "zod";

const createClassSchema = z.object({
  videoId: z.string(),
  title: z.string(),
  description: z.string(),
  resources: z.object({ name: z.string(), url: z.string() }).array(),
});

export default createClassSchema;
