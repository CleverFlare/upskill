"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@/lib/utils");
const image_1 = __importDefault(require("next/image"));
const react_hook_form_1 = require("react-hook-form");
function StepOne({ control }) {
    const { field: { value, onChange, onBlur }, fieldState: { error }, } = (0, react_hook_form_1.useController)({ control, name: "role" });
    return (<div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <div className={(0, utils_1.cn)("flex aspect-square flex-1 cursor-pointer flex-col items-center gap-2 rounded-lg border p-3 shadow", value === "student" ? "bg-primary/10 ring-2 ring-primary" : "")} onClick={() => onChange("student")} onBlur={() => onBlur()}>
          <image_1.default src="/student.png" alt="Student Illustration Image" width={143} height={143}/>
          <p className="text-lg font-bold">Student</p>
        </div>
        <div className={(0, utils_1.cn)("flex aspect-square flex-1 cursor-pointer flex-col items-center gap-2 rounded-lg border p-3 shadow", value === "instructor" ? "bg-primary/10 ring-2 ring-primary" : "")} onClick={() => onChange("instructor")} onBlur={() => onBlur()}>
          <image_1.default src="/teacher.png" alt="Instructor Illustration Image" width={143} height={143}/>
          <p className="text-lg font-bold">Instructor</p>
        </div>
      </div>
      {!!error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>);
}
exports.default = StepOne;
