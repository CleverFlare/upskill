import { createTRPCRouter } from "@/server/api/trpc";
import getInstructors from "./routers/get-instructors";
import setNotification from "./routers/set-notification";
import acceptInstructors from "./routers/accept-instructors";
import deleteUsers from "./routers/delete-users";
import acceptStudents from "./routers/accept-students";
import deleteCourseStudents from "./routers/delete-course-students";

const userRouter = createTRPCRouter({
  getInstructors,
  setNotification,
  acceptInstructors,
  deleteUsers,
  acceptStudents,
  deleteCourseStudents,
});

export default userRouter;
