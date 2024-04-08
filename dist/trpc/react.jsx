"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRPCReactProvider = exports.api = void 0;
const react_query_1 = require("@tanstack/react-query");
const client_1 = require("@trpc/client");
const react_query_2 = require("@trpc/react-query");
const react_1 = require("react");
const superjson_1 = __importDefault(require("superjson"));
const createQueryClient = () => new react_query_1.QueryClient();
let clientQueryClientSingleton = undefined;
const getQueryClient = () => {
    if (typeof window === "undefined") {
        // Server: always make a new query client
        return createQueryClient();
    }
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton !== null && clientQueryClientSingleton !== void 0 ? clientQueryClientSingleton : (clientQueryClientSingleton = createQueryClient()));
};
function getEndingLink() {
    var _a;
    if (typeof window === "undefined") {
        return (0, client_1.httpBatchLink)({
            transformer: superjson_1.default,
            url: getBaseUrl() + "/api/trpc",
            headers: () => {
                const headers = new Headers();
                headers.set("x-trpc-source", "nextjs-react");
                return headers;
            },
        });
    }
    const client = (0, client_1.createWSClient)({
        url: (_a = process.env.WS_URL) !== null && _a !== void 0 ? _a : "ws://localhost:3001",
    });
    return (0, client_1.wsLink)({
        client,
        transformer: superjson_1.default,
    });
}
exports.api = (0, react_query_2.createTRPCReact)();
function TRPCReactProvider(props) {
    const queryClient = getQueryClient();
    const [trpcClient] = (0, react_1.useState)(() => exports.api.createClient({
        links: [
            (0, client_1.loggerLink)({
                enabled: (op) => process.env.NODE_ENV === "development" ||
                    (op.direction === "down" && op.result instanceof Error),
            }),
            getEndingLink(),
        ],
    }));
    return (<react_query_1.QueryClientProvider client={queryClient}>
      <exports.api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </exports.api.Provider>
    </react_query_1.QueryClientProvider>);
}
exports.TRPCReactProvider = TRPCReactProvider;
function getBaseUrl() {
    var _a;
    if (typeof window !== "undefined")
        return window.location.origin;
    if (process.env.VERCEL_URL)
        return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000}`;
}
