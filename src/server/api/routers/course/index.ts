import { createTRPCRouter } from "@/server/api/trpc";
import create from "./routes/create";
import update from "./routes/update";
import deleteRoute from "./routes/delete";

const courseRouter = createTRPCRouter({
  create,
  update,
  delete: deleteRoute,
});

export default courseRouter;
