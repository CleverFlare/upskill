import { createTRPCRouter } from "@/server/api/trpc";
import create from "./routes/create";
import update from "./routes/update";
import deleteRoute from "./routes/delete";
import hasCourse from "./routes/has-course";

const courseRouter = createTRPCRouter({
  create,
  update,
  delete: deleteRoute,
  hasCourse,
});

export default courseRouter;
