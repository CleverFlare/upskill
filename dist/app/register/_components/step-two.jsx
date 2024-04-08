"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = __importDefault(require("@/components/input/field"));
function StepTwo({ control }) {
    return (<div className="flex flex-col gap-5">
      <field_1.default control={control} name="firstName" label="First Name" placeholder="first name..." required/>
      <field_1.default control={control} name="lastName" label="Last Name" placeholder="last name..." required/>
    </div>);
}
exports.default = StepTwo;
