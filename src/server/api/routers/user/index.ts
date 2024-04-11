import { createTRPCRouter } from "@/server/api/trpc";
import getInstructors from "./routers/get-instructors";
import setNotification from "./routers/set-notification";

const userRouter = createTRPCRouter({
  getInstructors,
  setNotification,
});

export default userRouter;
