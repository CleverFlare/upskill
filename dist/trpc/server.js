"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
require("server-only");
const headers_1 = require("next/headers");
const react_1 = require("react");
const root_1 = require("@/server/api/root");
const context_1 = require("@/server/api/context");
/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = (0, react_1.cache)(() => {
    const heads = new Headers((0, headers_1.headers)());
    heads.set("x-trpc-source", "rsc");
    return (0, context_1.createContext)({
        headers: heads,
    });
});
exports.api = (0, root_1.createCaller)(createContext);
