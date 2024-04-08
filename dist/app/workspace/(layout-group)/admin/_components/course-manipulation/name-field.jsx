"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@/lib/utils");
const react_hook_form_1 = require("react-hook-form");
function NameField({ control, name, ...rest }) {
    const { field: { value, onChange, ref, ...field }, fieldState: { error }, } = (0, react_hook_form_1.useController)({
        control,
        name,
    });
    return (<textarea className={(0, utils_1.cn)("z-20 h-full w-1/2 resize-none rounded-md bg-transparent text-4xl text-white caret-gray-500 outline-none dark:caret-white", "text-border", !!error ? "text-fill-destructive" : "")} placeholder="Title" value={value} onChange={(e) => onChange(e.target.value)} ref={ref} {...field} {...rest}/>);
}
exports.default = NameField;
