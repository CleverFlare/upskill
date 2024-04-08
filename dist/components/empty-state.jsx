"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const empty_box_svg_1 = __importDefault(require("./empty-box-svg"));
const utils_1 = require("@/lib/utils");
function EmptyState({ text = "Empty State", className, ...props }) {
    return (<div className={(0, utils_1.cn)("flex flex-col gap-4", className)} {...props}>
      <empty_box_svg_1.default />
      <p className="font-bold text-primary">{text}</p>
    </div>);
}
exports.default = EmptyState;
