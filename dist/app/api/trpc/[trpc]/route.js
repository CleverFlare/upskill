"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
const fetch_1 = require("@trpc/server/adapters/fetch");
const env_1 = require("@/env");
const root_1 = require("@/server/api/root");
const context_1 = require("@/server/api/context");
/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req) => {
    return (0, context_1.createContext)({
        headers: req.headers,
    });
};
const handler = (req) => (0, fetch_1.fetchRequestHandler)({
    endpoint: "/api/trpc",
    req,
    router: root_1.appRouter,
    createContext: () => createContext(req),
    onError: env_1.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path !== null && path !== void 0 ? path : "<no-path>"}: ${error.message}`);
        }
        : undefined,
});
exports.GET = handler;
exports.POST = handler;
