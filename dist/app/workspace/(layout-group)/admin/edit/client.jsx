"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const banner_1 = __importDefault(require("../_components/course-manipulation/banner"));
const name_field_1 = __importDefault(require("../_components/course-manipulation/name-field"));
const thumbnail_1 = __importDefault(require("../_components/course-manipulation/thumbnail"));
const description_field_1 = __importDefault(require("../_components/course-manipulation/description-field"));
const technologies_1 = __importDefault(require("../_components/course-manipulation/technologies"));
const prerequisites_1 = __importDefault(require("../_components/course-manipulation/prerequisites"));
const react_1 = require("@/trpc/react");
const lu_1 = require("react-icons/lu");
const link_1 = __importDefault(require("next/link"));
const update_course_1 = __importDefault(require("@/schema/update-course"));
const filter_changes_1 = __importDefault(require("@/lib/filter-changes"));
const to_base64_1 = require("@/lib/to-base64");
const navigation_1 = require("next/navigation");
const breadcrumbs_1 = __importDefault(require("../../_components/breadcrumbs"));
const instructors_1 = __importDefault(require("../_components/course-manipulation/instructors"));
function ClientPage({ defaultValues, id, }) {
    var _a, _b, _c;
    const { control, setError, formState: { errors }, handleSubmit, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(update_course_1.default),
        defaultValues,
    });
    console.log(errors);
    const router = (0, navigation_1.useRouter)();
    const updateCourse = react_1.api.course.update.useMutation({
        onSuccess: () => {
            router.push("/workspace/admin");
            router.refresh();
        },
    });
    async function submitData(data) {
        // utilizes the filterChange utility to detect changes
        const changes = (0, filter_changes_1.default)(defaultValues, data);
        // Check if there is no changes made
        if (!Object.entries(changes).length)
            return console.log("No changes to update");
        // Converts the thumbnail image to base64 format if its present
        if (changes === null || changes === void 0 ? void 0 : changes.thumbnail)
            changes.thumbnail = await (0, to_base64_1.toBase64)(data.thumbnail);
        // Converts the banner image to base64 format if its present
        if (changes === null || changes === void 0 ? void 0 : changes.banner)
            changes.banner = await (0, to_base64_1.toBase64)(data.banner);
        // Converts the technologies object into an array if its present
        if (changes === null || changes === void 0 ? void 0 : changes.technologies)
            changes.technologies = await Promise.all(Object.entries(data.technologies).map(async ([_, data]) => {
                if (!(data === null || data === void 0 ? void 0 : data.logoId))
                    data.logo = (await (0, to_base64_1.toBase64)(data.logo));
                return data;
            }));
        if (changes === null || changes === void 0 ? void 0 : changes.instructors)
            changes.instructors = changes.instructors.map(({ id, role }) => ({
                id,
                role,
            }));
        updateCourse.mutate({ id, ...changes });
    }
    return (<div className="py-5">
      <breadcrumbs_1.default items={[{ name: "Courses", href: "/workspace/admin" }, "Edit"]} className="mb-4"/>
      <form className="flex flex-col gap-10" onSubmit={handleSubmit(submitData)}>
        <banner_1.default onError={(message) => setError("banner", { message, type: "custom" })} control={control} name="banner" error={(_b = (_a = errors === null || errors === void 0 ? void 0 : errors.name) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : (_c = errors === null || errors === void 0 ? void 0 : errors.thumbnail) === null || _c === void 0 ? void 0 : _c.message} NameInput={<name_field_1.default control={control} name="name"/>} ActionButtons={<thumbnail_1.default control={control} name="thumbnail" onError={(message) => setError("thumbnail", { message, type: "custom" })}/>}/>
        <description_field_1.default control={control} name="description"/>
        <technologies_1.default control={control} name="technologies"/>
        <instructors_1.default control={control} name="instructors"/>
        <prerequisites_1.default control={control} name="prerequisites"/>
        <div className="flex justify-end gap-4">
          <button_1.Button variant="outline" type="button" asChild>
            <link_1.default href=".">Cancel</link_1.default>
          </button_1.Button>
          <button_1.Button type="submit" disabled={updateCourse.isPending} aria-disabled={updateCourse.isPending}>
            {updateCourse.isPending && (<lu_1.LuLoader2 className="me-2 animate-spin"/>)}
            Update
          </button_1.Button>
        </div>
      </form>
    </div>);
}
exports.default = ClientPage;
