"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@/lib/utils");
function StepLine({ checked, className, isError, ...props }) {
    return (<div className={(0, utils_1.cn)("h-[2px] flex-1", checked
            ? isError
                ? "bg-destructive"
                : "bg-primary"
            : "bg-[hsl(var(--border))]", className)} {...props}></div>);
}
exports.default = StepLine;
