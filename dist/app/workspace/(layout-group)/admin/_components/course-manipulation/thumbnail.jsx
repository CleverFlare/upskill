"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const dialog_1 = require("@/components/ui/dialog");
const utils_1 = require("@/lib/utils");
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const hi2_1 = require("react-icons/hi2");
function Thumbnail({ onError, control, name, ...rest }) {
    const { field: { value, onChange, ref, ...field }, fieldState: { error }, } = (0, react_hook_form_1.useController)({
        control,
        name,
    });
    const labelRef = (0, react_1.createRef)();
    async function handleChange(e) {
        var _a, _b, _c, _d, _e, _f, _g;
        const size = ((_c = (_b = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.size) !== null && _c !== void 0 ? _c : 0) / (1024 * 1024);
        if (!((_e = (_d = e.target) === null || _d === void 0 ? void 0 : _d.files) === null || _e === void 0 ? void 0 : _e[0]))
            return;
        if (!((_g = (_f = e.target.files) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.type.includes("image")))
            return onError("Non-image file in thumbnail");
        else if (size > 20)
            return onError("Your thumbnail image is over 20MB in size");
        onChange(e.target.files[0]);
    }
    return (<dialog_1.Dialog>
      <dialog_1.DialogTrigger asChild>
        <button_1.Button variant="secondary" size="icon" className={(0, utils_1.cn)(!!error ? "border border-destructive" : "")}>
          <hi2_1.HiPhoto />
        </button_1.Button>
      </dialog_1.DialogTrigger>
      <dialog_1.DialogContent>
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle>Course Thumbnail</dialog_1.DialogTitle>
          <dialog_1.DialogDescription>
            This will set the course thumbnail.
          </dialog_1.DialogDescription>
        </dialog_1.DialogHeader>
        <div className={(0, utils_1.cn)("relative aspect-video max-h-[200px] cursor-pointer overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800", !!error ? "border border-destructive" : "")} onClick={() => { var _a; return (_a = labelRef.current) === null || _a === void 0 ? void 0 : _a.click(); }}>
          <label htmlFor="thumbnail-field" className="hidden" ref={labelRef}></label>
          {!!value && (<image_1.default src={typeof value === "string"
                ? value
                : URL.createObjectURL(value)} layout="fill" objectFit="cover" objectPosition="center" alt="thumbnail"/>)}
          <input type="file" ref={ref} className="hidden" onChange={handleChange} id="thumbnail-field" {...field} {...rest}/>
        </div>
        <dialog_1.DialogFooter className="flex gap-y-4">
          <button_1.Button variant="outline" onClick={() => onChange(undefined)} className="text-destructive hover:text-destructive" type="button">
            Remove
          </button_1.Button>
          <dialog_1.DialogClose asChild>
            <button_1.Button type="button">Save</button_1.Button>
          </dialog_1.DialogClose>
        </dialog_1.DialogFooter>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
}
exports.default = Thumbnail;
