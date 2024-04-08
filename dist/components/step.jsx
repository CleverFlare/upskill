"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@/lib/utils");
const class_variance_authority_1 = require("class-variance-authority");
const hi2_1 = require("react-icons/hi2");
const stepVariants = (0, class_variance_authority_1.cva)("min-w-[32px] min-h-[32px] rounded-full border-2 cursor-pointer flex justify-center items-center", {
    variants: {
        state: {
            default: "border-gray-200",
            selected: "border-[hsl(var(--color))]",
            checked: "bg-[hsl(var(--color))] border-[hsl(var(--color))]",
        },
        isError: {
            false: "[--color:var(--primary)]",
            true: "[--color:var(--destructive)]",
        },
    },
    defaultVariants: {
        state: "default",
    },
});
function Step({ state, isError, className, ...props }) {
    return (<div className={(0, utils_1.cn)(stepVariants({ state, isError: !!isError }), className)} {...props}>
      {state === "selected" && (<div className={(0, utils_1.cn)("size-[10px] rounded-full bg-[hsl(var(--color))]")}></div>)}
      {state === "checked" && !isError && (<hi2_1.HiCheck className="text-xl text-white"/>)}
      {state === "checked" && !!isError && (<hi2_1.HiXMark className="text-xl text-white"/>)}
    </div>);
}
exports.default = Step;
