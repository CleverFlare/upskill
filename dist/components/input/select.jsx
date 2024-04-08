"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const label_1 = require("../ui/label");
const select_1 = require("../ui/select");
const utils_1 = require("@/lib/utils");
function SelectInput({ control, name, label, required, children, placeholder, noHelperText, ...props }) {
    const { field: { value, onChange, onBlur, ref }, fieldState: { error }, } = (0, react_hook_form_1.useController)({
        control,
        name,
    });
    const labelId = crypto.randomUUID();
    return (<div className="flex flex-col gap-2">
      {!!label && (<label_1.Label htmlFor={labelId} required={required}>
          {label}
        </label_1.Label>)}

      <select_1.Select value={value} onValueChange={(value) => onChange(value)} {...props}>
        <select_1.SelectTrigger id={labelId} className={(0, utils_1.cn)("focus:ring-2", !!error
            ? "border border-destructive focus:ring-destructive"
            : "focus:ring-primary", value ? "" : "text-gray-500")} ref={ref} onBlur={() => onBlur()}>
          <select_1.SelectValue placeholder={placeholder}/>
        </select_1.SelectTrigger>
        <select_1.SelectContent>{children}</select_1.SelectContent>
      </select_1.Select>

      {!!error && !noHelperText && (<p className="text-sm text-destructive">{error.message}</p>)}
    </div>);
}
exports.default = SelectInput;
