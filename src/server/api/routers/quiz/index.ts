import { createTRPCRouter } from "@/server/api/trpc";
import submitQuiz from "./routers/submit-quiz";
import collectPoints from "./routers/collect-points";
import create from "./routers/create";
import deleteRoute from "./routers/delete";

const quizRouter = createTRPCRouter({
  submitQuiz,
  collectPoints,
  create,
  delete: deleteRoute,
});

export default quizRouter;
