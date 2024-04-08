"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("next-auth/react");
function Providers({ children }) {
    return <react_1.SessionProvider>{children}</react_1.SessionProvider>;
}
exports.default = Providers;
