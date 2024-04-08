"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = __importDefault(require("@/components/input/field"));
const textarea_1 = __importDefault(require("@/components/input/textarea"));
const button_1 = require("@/components/ui/button");
const to_base64_1 = require("@/lib/to-base64");
const utils_1 = require("@/lib/utils");
const create_post_1 = __importDefault(require("@/schema/create-post"));
const react_1 = require("@/trpc/react");
const zod_1 = require("@hookform/resolvers/zod");
const image_1 = __importDefault(require("next/image"));
const navigation_1 = require("next/navigation");
const react_2 = require("react");
const react_hook_form_1 = require("react-hook-form");
const hi2_1 = require("react-icons/hi2");
const lu_1 = require("react-icons/lu");
function AnnouncementForm({ courseId }) {
    const { control, reset, handleSubmit, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(create_post_1.default),
    });
    const { field: { value, onChange, onBlur, ref }, } = (0, react_hook_form_1.useController)({
        control,
        name: "image",
    });
    const imageRef = (0, react_2.createRef)();
    const router = (0, navigation_1.useRouter)();
    const { mutate, isPending } = react_1.api.course.createAnnouncement.useMutation({
        onSuccess() {
            reset();
            router.refresh();
        },
    });
    async function submitData(data) {
        const image = !!(data === null || data === void 0 ? void 0 : data.image)
            ? (await (0, to_base64_1.toBase64)(data.image))
            : undefined;
        console.log("Should call");
        mutate({
            title: data.title,
            content: data.content,
            image,
            courseId,
        });
    }
    return (<form className="flex h-max items-end gap-2 border-t pt-2" onSubmit={handleSubmit(submitData)}>
      <label htmlFor="image" className="hidden" ref={imageRef}></label>
      <input id="image" type="file" ref={ref} onChange={(e) => { var _a; return onChange((_a = e.currentTarget.files) === null || _a === void 0 ? void 0 : _a[0]); }} className="hidden"/>
      <button_1.Button variant="outline" size="icon" className={(0, utils_1.cn)("relative aspect-square h-full w-auto overflow-hidden", (errors === null || errors === void 0 ? void 0 : errors.image) ? "border-destructive" : "")} onBlur={() => onBlur()} onClick={() => { var _a; return (_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.click(); }} type="button">
        {!value && <hi2_1.HiOutlinePhoto className="text-2xl"/>}
        {!!value && (<image_1.default src={typeof value === "string" ? value : URL.createObjectURL(value)} alt="post image" width={98} height={98} className="absolute left-0 top-0 h-full w-full object-cover"/>)}
      </button_1.Button>
      <div className="flex h-full flex-1 flex-col gap-2">
        <field_1.default control={control} name="title" placeholder="Title..." noHelperText/>
        <textarea_1.default control={control} name="content" placeholder="Content..." className="resize-none" noHelperText/>
      </div>
      <button_1.Button size="icon" disabled={isPending}>
        {!isPending && <hi2_1.HiPaperAirplane className="text-base"/>}
        {isPending && <lu_1.LuLoader2 className="animate-spin text-base"/>}
      </button_1.Button>
    </form>);
}
exports.default = AnnouncementForm;
