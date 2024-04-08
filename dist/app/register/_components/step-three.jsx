"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const select_1 = require("@/components/ui/select");
const date_1 = __importDefault(require("@/components/input/date"));
const select_2 = __importDefault(require("@/components/input/select"));
const field_1 = __importDefault(require("@/components/input/field"));
const number_1 = __importDefault(require("@/components/input/number"));
function StepThree({ control }) {
    return (<div className="flex flex-col gap-5">
      <date_1.default control={control} name="birthDay" label="Birth Day" required placeholder="birth day..."/>
      <select_2.default control={control} name="gender" label="Gender" required placeholder="gender...">
        <select_1.SelectItem value="male">Male</select_1.SelectItem>
        <select_1.SelectItem value="female">Female</select_1.SelectItem>
      </select_2.default>
      <field_1.default control={control} name="email" required type="email" label="Email" placeholder="email..."/>
      <number_1.default control={control} name="phone" label="Phone" required placeholder="phone..."/>
    </div>);
}
exports.default = StepThree;
