"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const manage_instructors_button_1 = __importDefault(require("../../_components/manage-instructors-button"));
const team_member_card_1 = __importDefault(require("@/components/team-member-card"));
function Instructors({ name, control, }) {
    const { field: { value, onChange }, fieldState: { error }, } = (0, react_hook_form_1.useController)({ name, control });
    return (<div className="flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
          team
        </p>
        <manage_instructors_button_1.default value={value} onChange={onChange}/>
      </div>
      <div className="box-content flex w-full snap-x snap-mandatory flex-wrap gap-4 overflow-x-auto pb-2 md:overflow-x-visible">
        {value.map(({ name, role, image }) => (<team_member_card_1.default name={name} role={role} image={image}/>))}
      </div>
      {!!error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>);
}
exports.default = Instructors;
