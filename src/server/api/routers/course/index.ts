import { createTRPCRouter } from "@/server/api/trpc";
import create from "./routes/create";
import update from "./routes/update";
import deleteRoute from "./routes/delete";
import createAnnouncement from "./routes/create-announcement";

const courseRouter = createTRPCRouter({
  create,
  update,
  delete: deleteRoute,
  createAnnouncement,
});

export default courseRouter;
