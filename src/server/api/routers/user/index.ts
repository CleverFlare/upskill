import { createTRPCRouter } from "@/server/api/trpc";
import getInstructors from "./routers/get-instructors";
import setNotification from "./routers/set-notification";
import acceptInstructors from "./routers/accept-instructors";
import deleteUsers from "./routers/delete-users";

const userRouter = createTRPCRouter({
  getInstructors,
  setNotification,
  acceptInstructors,
  deleteUsers,
});

export default userRouter;
