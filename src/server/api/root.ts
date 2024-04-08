import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import course from "./routers/course/index";
import auth from "./routers/auth/index";
import user from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  course,
  auth,
  user,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
