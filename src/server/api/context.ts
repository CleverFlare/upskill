import { getServerAuthSession } from "../auth";
import { db } from "../db";
import { ee } from "./trpc";

export const createContext = async (opts: { headers: Headers }) => {
  const session = await getServerAuthSession();

  return {
    db,
    session,
    ee,
    ...opts,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
