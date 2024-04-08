"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const input_1 = require("../ui/input");
const label_1 = require("../ui/label");
const utils_1 = require("@/lib/utils");
const react_number_format_1 = require("react-number-format");
function NumberInput({ control, name, label, required, className, noHelperText, ...props }) {
    const { field: { value, onChange, onBlur, ref }, fieldState: { error }, } = (0, react_hook_form_1.useController)({
        control,
        name,
    });
    const labelId = crypto.randomUUID();
    return (<div className="flex flex-col gap-2">
      {!!label && (<label_1.Label htmlFor={labelId} required={required}>
          {label}
        </label_1.Label>)}
      <input type="text" value={value} onChange={() => onChange()} className="hidden" ref={ref}/>
      <react_number_format_1.NumericFormat customInput={input_1.Input} id={labelId} className={(0, utils_1.cn)(!!error
            ? "border border-destructive focus-visible:ring-destructive"
            : "", className)} onChange={(e) => onChange(e.target.value)} value={value} onBlur={() => onBlur()} {...props}/>
      {!!error && !noHelperText && (<p className="text-sm text-destructive">{error.message}</p>)}
    </div>);
}
exports.default = NumberInput;
