"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
const button_1 = require("@/components/ui/button");
const navigation_1 = require("next/navigation");
function Navlink({ variant, size, children, href, className, buttonClassName, ...props }) {
    const pathname = (0, navigation_1.usePathname)();
    const isActive = pathname === href;
    return (<link_1.default href={href} className={className}>
      <button_1.Button variant={(variant !== null && variant !== void 0 ? variant : isActive) ? "secondary" : "ghost"} size={size !== null && size !== void 0 ? size : "sm"} className={buttonClassName} {...props}>
        {children}
      </button_1.Button>
    </link_1.default>);
}
exports.default = Navlink;
