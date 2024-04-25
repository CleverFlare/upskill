import { createTRPCRouter } from "@/server/api/trpc";
import create from "./routes/create";
import update from "./routes/update";
import deleteRoute from "./routes/delete";
import createAnnouncement from "./routes/create-announcement";
import deleteAnnouncement from "./routes/delete-announcement";
import getCourseRelation from "./routes/get-course-relation";
import createClass from "./routes/create-class";
import deleteClass from "./routes/delete-class";
import toggleClassLock from "./routes/toggle-class-lock";
import enrollRequest from "./routes/enroll-request";
import attend from "./routes/attend";
import absent from "./routes/absent";
import createAssignment from "./routes/create-assignment";
import submitAssignment from "./routes/submit-assignment";
import deleteAssignment from "./routes/delete-assignment";
import rejectSubmission from "./routes/reject-submission";

const courseRouter = createTRPCRouter({
  create,
  update,
  delete: deleteRoute,
  createAnnouncement,
  deleteAnnouncement,
  getCourseRelation,
  createClass,
  deleteClass,
  toggleClassLock,
  enrollRequest,
  attend,
  absent,
  createAssignment,
  submitAssignment,
  deleteAssignment,
  rejectSubmission,
});

export default courseRouter;
