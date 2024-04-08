"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const textarea_1 = require("@/components/ui/textarea");
const utils_1 = require("@/lib/utils");
const react_hook_form_1 = require("react-hook-form");
function DescriptionField({ control, name, ...rest }) {
    const { field: { value, onChange, ref, ...field }, fieldState: { error }, } = (0, react_hook_form_1.useController)({
        control,
        name,
    });
    return (<div className="flex flex-col gap-4">
      <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
        track description
      </p>
      <div className="flex flex-col gap-2">
        <textarea_1.Textarea placeholder="Description..." className={(0, utils_1.cn)("resize-y", !!error
            ? "border border-destructive focus-visible:ring-1 focus-visible:ring-destructive"
            : "")} value={value} onChange={(e) => onChange(e.target.value)} rows={4} ref={ref} {...field} {...rest}/>
        {!!error && <p className="text-sm text-destructive">{error.message}</p>}
      </div>
    </div>);
}
exports.default = DescriptionField;
