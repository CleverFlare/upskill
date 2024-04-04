import { createTRPCRouter } from "@/server/api/trpc";
import getInstructors from "./routers/get-instructors";

const userRouter = createTRPCRouter({
  getInstructors,
});

export default userRouter;
