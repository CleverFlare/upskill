"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const auth_1 = require("../auth");
const db_1 = require("../db");
const trpc_1 = require("./trpc");
const createContext = async (opts) => {
    const session = await (0, auth_1.getServerAuthSession)();
    return {
        db: db_1.db,
        session,
        ee: trpc_1.ee,
        ...opts,
    };
};
exports.createContext = createContext;
