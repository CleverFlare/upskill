"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calendar_1 = require("@/components/ui/calendar");
const react_hook_form_1 = require("react-hook-form");
const popover_1 = require("../ui/popover");
const label_1 = require("../ui/label");
const button_1 = require("../ui/button");
const utils_1 = require("@/lib/utils");
const date_fns_1 = require("date-fns");
const hi2_1 = require("react-icons/hi2");
function DateInput({ control, name, label, required, placeholder, noHelperText, ...props }) {
    const { field: { value, onChange, onBlur, ref }, fieldState: { error }, } = (0, react_hook_form_1.useController)({
        control,
        name,
    });
    const labelId = crypto.randomUUID();
    return (<div className="flex flex-col gap-2">
      {!!label && (<label_1.Label htmlFor={labelId} required={required}>
          {label}
        </label_1.Label>)}

      <input type="text" className="hidden" value={value} onChange={() => onChange()} ref={ref}/>

      <popover_1.Popover>
        <popover_1.PopoverTrigger asChild>
          <button_1.Button variant="outline" id={labelId} className={(0, utils_1.cn)("px-3 focus:ring-2 focus:ring-primary", !!error
            ? "border border-destructive focus:ring-destructive"
            : "focus:ring-primary")} onBlur={() => onBlur()}>
            {value ? (<p className="font-normal">{(0, date_fns_1.format)(value, "PPP")}</p>) : (<p className="font-normal text-muted-foreground">
                {placeholder !== null && placeholder !== void 0 ? placeholder : "Date Input"}
              </p>)}
            <div className="ms-auto">
              <hi2_1.HiCalendar className="text-gray-500"/>
            </div>
          </button_1.Button>
        </popover_1.PopoverTrigger>
        <popover_1.PopoverContent>
          <calendar_1.Calendar mode="single" captionLayout="dropdown-buttons" fromYear={1600} toYear={2015} onSelect={(value) => onChange(value)} selected={value} {...props}/>
        </popover_1.PopoverContent>
      </popover_1.Popover>

      {!!error && !noHelperText && (<p className="text-sm text-destructive">{error.message}</p>)}
    </div>);
}
exports.default = DateInput;
