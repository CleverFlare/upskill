import { createTRPCRouter } from "@/server/api/trpc";
import submitQuiz from "./routers/submit-quiz";
import collectPoints from "./routers/collect-points";

const quizRouter = createTRPCRouter({
  submitQuiz, collectPoints,
});

export default quizRouter;
