"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@/lib/utils");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
function CourseCard({ children, className, thumbnailUrl = "/course thumbnail.jpg", ...props }) {
    return (<link_1.default className={(0, utils_1.cn)("flex flex-col gap-3", className)} {...props}>
      <image_1.default src={thumbnailUrl} alt="course thumbnail" width={1000} height={1000} className="aspect-video w-full rounded-md"/>
      <p className="w-full text-xl font-bold md:text-base">{children}</p>
    </link_1.default>);
}
exports.default = CourseCard;
