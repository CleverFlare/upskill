"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = void 0;
const React = __importStar(require("react"));
const react_icons_1 = require("@radix-ui/react-icons");
const react_day_picker_1 = require("react-day-picker");
const utils_1 = require("@/lib/utils");
const button_1 = require("@/components/ui/button");
const select_1 = require("./select");
const scroll_area_1 = require("./scroll-area");
function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
    return (<react_day_picker_1.DayPicker showOutsideDays={showOutsideDays} className={(0, utils_1.cn)("p-3", className)} classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            // caption_label: "text-sm font-medium",
            caption_label: "hidden",
            nav: "space-x-1 flex items-center",
            nav_button: (0, utils_1.cn)((0, button_1.buttonVariants)({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: (0, utils_1.cn)("relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md", props.mode === "range"
                ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                : "[&:has([aria-selected])]:rounded-md"),
            day: (0, utils_1.cn)((0, button_1.buttonVariants)({ variant: "ghost" }), "h-8 w-8 p-0 font-normal aria-selected:opacity-100"),
            day_range_start: "day-range-start",
            day_range_end: "day-range-end",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
            ...classNames,
        }} components={{
            Dropdown: ({ value, onChange, children, ...props }) => {
                var _a;
                const options = React.Children.toArray(children);
                const selected = options.find((child) => child.props.value === value);
                const handleChange = (value) => {
                    const changeEvent = {
                        target: { value },
                    };
                    onChange === null || onChange === void 0 ? void 0 : onChange(changeEvent);
                };
                return (<select_1.Select value={value === null || value === void 0 ? void 0 : value.toString()} onValueChange={(value) => {
                        handleChange(value);
                    }}>
              <select_1.SelectTrigger className="pr-1.5 focus:ring-0">
                <select_1.SelectValue>{(_a = selected === null || selected === void 0 ? void 0 : selected.props) === null || _a === void 0 ? void 0 : _a.children}</select_1.SelectValue>
              </select_1.SelectTrigger>
              <select_1.SelectContent position="popper">
                <scroll_area_1.ScrollArea className="h-80">
                  {options.map((option, id) => {
                        var _a, _b;
                        return (<select_1.SelectItem key={`${option.props.value}-${id}`} value={(_b = (_a = option.props.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""}>
                      {option.props.children}
                    </select_1.SelectItem>);
                    })}
                </scroll_area_1.ScrollArea>
              </select_1.SelectContent>
            </select_1.Select>);
            },
            IconLeft: ({ ...props }) => <react_icons_1.ChevronLeftIcon className="h-4 w-4"/>,
            IconRight: ({ ...props }) => <react_icons_1.ChevronRightIcon className="h-4 w-4"/>,
        }} {...props}/>);
}
exports.Calendar = Calendar;
Calendar.displayName = "Calendar";
