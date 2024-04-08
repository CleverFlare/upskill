"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("@/server/api/trpc");
const observable_1 = require("@trpc/server/observable");
exports.default = trpc_1.publicProcedure.subscription(async ({ ctx }) => {
    return (0, observable_1.observable)((emit) => {
        function handleTest() {
            emit.next("I'm working!");
        }
        console.log(ctx.ee);
        ctx.ee.on("TEST", handleTest);
        return () => ctx.ee.off("TEST", handleTest);
    });
});
