import { publicProcedure } from "@/server/api/trpc";
import { observable } from "@trpc/server/observable";

export default publicProcedure.subscription(async ({ ctx }) => {
  return observable((emit) => {
    function handleTest() {
      emit.next("I'm working!");
    }

    console.log(ctx.ee);

    ctx.ee.on("TEST", handleTest);

    return () => ctx.ee.off("TEST", handleTest);
  });
});
