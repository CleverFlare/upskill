import { createTRPCRouter } from "@/server/api/trpc";
import create from "./routes/create";
import update from "./routes/update";
import deleteRoute from "./routes/delete";
import createAnnouncement from "./routes/create-announcement";
import deleteAnnouncement from "./routes/delete-announcement";
import getCourseRelation from "./routes/get-course-relation";

const courseRouter = createTRPCRouter({
  create,
  update,
  delete: deleteRoute,
  createAnnouncement,
  deleteAnnouncement,
  getCourseRelation,
});

export default courseRouter;
