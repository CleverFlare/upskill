"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@/lib/utils");
const date_fns_1 = require("date-fns");
const image_1 = __importDefault(require("next/image"));
const hi2_1 = require("react-icons/hi2");
function Announcement({ title, image, children, className, createdAt, ...props }) {
    return (<div className={(0, utils_1.cn)("flex h-max w-full flex-col gap-3 rounded-lg border-s-4 border-yellow-300 bg-yellow-500/10 p-5", className)} {...props}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <hi2_1.HiOutlineMegaphone className="text-5xl text-yellow-500 sm:text-6xl"/>
        <div className="flex flex-col">
          <p className="text-xl font-bold">{title}</p>
          <p className="text-muted-foreground">{children}</p>
        </div>
      </div>
      {!!image && (<image_1.default src={image} alt="image" width={800} height={800} className="w-[800px] rounded-lg object-cover"/>)}
      <div className="flex justify-end">
        <p className="text-sm text-muted-foreground">
          {(0, date_fns_1.format)(createdAt, "PPp")}
        </p>
      </div>
    </div>);
}
exports.default = Announcement;
