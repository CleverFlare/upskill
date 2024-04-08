import { createTRPCRouter } from "@/server/api/trpc";
import create from "./routes/create";
import update from "./routes/update";
import deleteRoute from "./routes/delete";
import createAnnouncement from "./routes/create-announcement";
import deleteAnnouncement from "./routes/delete-announcement";
import onTest from "./routes/on-test";

const courseRouter = createTRPCRouter({
  create,
  update,
  delete: deleteRoute,
  createAnnouncement,
  deleteAnnouncement,
  onTest,
});

export default courseRouter;
