"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = __importDefault(require("@/components/input/field"));
function StepFour({ control }) {
    return (<div className="flex flex-col gap-5">
      <field_1.default control={control} name="username" label="Username" placeholder="username..." required/>
      <field_1.default control={control} name="password" label="Password" placeholder="password..." type="password" required/>
    </div>);
}
exports.default = StepFour;
