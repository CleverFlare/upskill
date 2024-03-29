import { createTRPCRouter } from "@/server/api/trpc";
import register from "./routes/register";

const courseRouter = createTRPCRouter({
  register,
});

export default courseRouter;
