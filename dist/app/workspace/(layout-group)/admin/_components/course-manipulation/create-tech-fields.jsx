"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoField = exports.NameField = void 0;
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const react_hook_form_1 = require("react-hook-form");
function NameField({ control, name, }) {
    var _a;
    const { field: { value, onChange, ref, ...field }, fieldState: { error }, } = (0, react_hook_form_1.useController)({
        control,
        name,
    });
    return (<div className="grid grid-cols-4 items-center gap-4">
      <label_1.Label htmlFor="name" className="text-right">
        Name
      </label_1.Label>
      <div className="col-span-3 flex flex-col gap-2">
        <input_1.Input id="name" value={(_a = value) !== null && _a !== void 0 ? _a : ""} onChange={(e) => onChange(e.target.value)} ref={ref} {...field}/>
        {!!error && <p className="text-sm text-destructive">{error.message}</p>}
      </div>
    </div>);
}
exports.NameField = NameField;
function LogoField({ control, name, onError }) {
    const { field: { value: _, onChange, ref, ...field }, fieldState: { error }, } = (0, react_hook_form_1.useController)({
        control,
        name,
    });
    async function handleChange(e) {
        var _a, _b, _c, _d, _e, _f, _g;
        const size = ((_c = (_b = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.size) !== null && _c !== void 0 ? _c : 0) / (1024 * 1024);
        if (!((_e = (_d = e.target) === null || _d === void 0 ? void 0 : _d.files) === null || _e === void 0 ? void 0 : _e[0]))
            return;
        if (!((_g = (_f = e.target.files) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.type.includes("image")))
            return onError("Non-image file in banner");
        else if (size > 20)
            return onError(`Your banner image is over 20MB in size`);
        onChange(e.target.files[0]);
    }
    return (<div className="grid grid-cols-4 items-center gap-4">
      <label_1.Label htmlFor="logoUrl" className="text-right">
        Logo
      </label_1.Label>
      <div className="col-span-3 flex flex-col gap-2">
        <input_1.Input type="file" id="logoUrl" onChange={handleChange} ref={ref} {...field}/>
        {!!error && (<p className="text-sm text-destructive">
            {typeof error === "object" ? JSON.stringify(error) : error}
          </p>)}
      </div>
    </div>);
}
exports.LogoField = LogoField;
