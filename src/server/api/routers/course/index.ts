import { createTRPCRouter } from "@/server/api/trpc";
import create from "./routes/create";
import update from "./routes/update";
import deleteRoute from "./routes/delete";
import createAnnouncement from "./routes/create-announcement";
import deleteAnnouncement from "./routes/delete-announcement";

const courseRouter = createTRPCRouter({
  create,
  update,
  delete: deleteRoute,
  createAnnouncement,
  deleteAnnouncement,
});

export default courseRouter;
