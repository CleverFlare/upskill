"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@/lib/utils");
const image_1 = __importDefault(require("next/image"));
const tooltip_1 = require("./ui/tooltip");
const button_1 = require("./ui/button");
const hi2_1 = require("react-icons/hi2");
function TechnologyCard({ logoUrl, name, className, onDelete, ...props }) {
    name;
    return (<div className="group relative">
      <tooltip_1.TooltipProvider>
        <tooltip_1.Tooltip>
          <tooltip_1.TooltipTrigger>
            <div className={(0, utils_1.cn)(" flex h-screen max-h-24 w-full max-w-24 snap-center items-center justify-center rounded-lg bg-gray-50 p-3 shadow dark:bg-gray-900", className)} {...props}>
              <image_1.default src={logoUrl} alt="Technology Image" width={76} height={76} className="max-h-[76px] max-w-[76px]"/>
            </div>
          </tooltip_1.TooltipTrigger>
          <tooltip_1.TooltipContent>
            <p>{name}</p>
          </tooltip_1.TooltipContent>
        </tooltip_1.Tooltip>
      </tooltip_1.TooltipProvider>
      {Boolean(onDelete) && (<button_1.Button variant="outline" className="absolute right-1 top-1 text-destructive opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100" size="icon" onClick={onDelete}>
          <hi2_1.HiTrash />
        </button_1.Button>)}
    </div>);
}
exports.default = TechnologyCard;
