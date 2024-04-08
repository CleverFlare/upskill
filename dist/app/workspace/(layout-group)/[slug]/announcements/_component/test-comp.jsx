"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@/trpc/react");
const react_2 = require("react");
function TestComp() {
    const [message, setMessage] = (0, react_2.useState)();
    react_1.api.course.onTest.useSubscription(undefined, {
        onData: (data) => {
            setMessage(data);
            console.log(data);
        },
    });
    return <>{!!message && message}</>;
}
exports.default = TestComp;
