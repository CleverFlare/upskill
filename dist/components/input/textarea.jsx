"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const label_1 = require("../ui/label");
const utils_1 = require("@/lib/utils");
const textarea_1 = require("../ui/textarea");
function TextareaInput({ control, name, label, required, className, noHelperText, ...props }) {
    const { field: { value, onChange, onBlur, ref }, fieldState: { error }, } = (0, react_hook_form_1.useController)({
        control,
        name,
    });
    const labelId = crypto.randomUUID();
    return (<div className="flex flex-col gap-2">
      {!!label && (<label_1.Label htmlFor={labelId} required={required}>
          {label}
        </label_1.Label>)}
      <textarea_1.Textarea id={labelId} className={(0, utils_1.cn)(!!error
            ? "border border-destructive focus-visible:ring-destructive"
            : "", className)} ref={ref} onChange={(e) => onChange(e.target.value)} onBlur={() => onBlur()} value={value !== null && value !== void 0 ? value : ""} {...props}/>
      {!!error && !noHelperText && (<p className="text-sm text-destructive">{error.message}</p>)}
    </div>);
}
exports.default = TextareaInput;
