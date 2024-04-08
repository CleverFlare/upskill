"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = require("./root");
const ws_1 = require("@trpc/server/adapters/ws");
const ws_2 = require("ws");
const db_1 = require("../db");
const trpc_1 = require("./trpc");
const createContext = async (opts) => {
    return {
        db: db_1.db,
        ee: trpc_1.ee,
        ...opts,
    };
};
const wss = new ws_2.WebSocketServer({
    port: 3001,
});
const handler = (0, ws_1.applyWSSHandler)({
    wss,
    router: root_1.appRouter,
    // @ts-expect-error annoying
    createContext,
});
wss.on("connection", (ws) => {
    console.log(`➕➕ Connection (${wss.clients.size})`);
    ws.once("close", () => {
        console.log(`➖➖ Connection (${wss.clients.size})`);
    });
});
console.log("✅ WebSocket Server listening on ws://localhost:3001");
process.on("SIGTERM", () => {
    console.log("SIGTERM");
    handler.broadcastReconnectNotification();
    wss.close();
});
