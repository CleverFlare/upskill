"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@/lib/utils");
function Container({ className, ...props }) {
    return (<div className={(0, utils_1.cn)("mx-auto h-full w-full max-w-[1200px] px-4", className)} {...props}/>);
}
exports.default = Container;
