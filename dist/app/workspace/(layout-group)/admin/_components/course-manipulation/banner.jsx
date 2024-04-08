"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const utils_1 = require("@/lib/utils");
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const hi2_1 = require("react-icons/hi2");
function Banner({ onError, error: additionalError, NameInput, ActionButtons, control, name, ...rest }) {
    var _a;
    const labelRef = (0, react_1.createRef)();
    const { field: { onChange, value, ref, ...field }, fieldState: { error }, } = (0, react_hook_form_1.useController)({ control, name });
    async function handleChange(e) {
        var _a, _b, _c, _d, _e, _f, _g;
        const size = ((_c = (_b = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.size) !== null && _c !== void 0 ? _c : 0) / (1024 * 1024);
        if (!((_e = (_d = e.target) === null || _d === void 0 ? void 0 : _d.files) === null || _e === void 0 ? void 0 : _e[0]))
            return;
        if (!((_g = (_f = e.target.files) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.type.includes("image")))
            return onError("Non-image file in banner");
        else if (size > 20)
            return onError("Your banner image is over 20MB in size");
        onChange(e.target.files[0]);
    }
    return (<div className="flex flex-col gap-2">
      <div className={(0, utils_1.cn)("relative h-[217px] w-full overflow-hidden rounded-xl p-5", value ? "" : "bg-gray-200 dark:bg-gray-500", !!error ? "border border-destructive" : "")}>
        {NameInput}
        <div className="absolute right-4 top-4 flex gap-4">
          {ActionButtons}
          <label htmlFor="banner-input" ref={labelRef} className="hidden"></label>
          <button_1.Button variant="secondary" size="icon" className={(0, utils_1.cn)(!!error ? "border border-destructive" : "")} onClick={() => { var _a; return (_a = labelRef.current) === null || _a === void 0 ? void 0 : _a.click(); }} type="button">
            <hi2_1.HiPencil />
          </button_1.Button>
        </div>
        <input type="file" id="banner-input" ref={ref} onChange={handleChange} className="hidden" {...field} {...rest}/>
        {!!value && (<image_1.default src={typeof value === "string"
                ? value
                : URL.createObjectURL(value)} className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full bg-gray-200 object-cover object-center" width={1168} height={217} alt="banner"/>)}
      </div>
      {(!!error || !!additionalError) && (<p className="text-sm text-destructive">
          {(_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : additionalError}
        </p>)}
    </div>);
}
exports.default = Banner;
