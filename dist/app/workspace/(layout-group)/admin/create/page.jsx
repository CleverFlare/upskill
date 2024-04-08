"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const create_course_1 = __importDefault(require("@/schema/create-course"));
const to_base64_1 = require("@/lib/to-base64");
const react_1 = require("@/trpc/react");
const navigation_1 = require("next/navigation");
const lu_1 = require("react-icons/lu");
const link_1 = __importDefault(require("next/link"));
const breadcrumbs_1 = __importDefault(require("../../_components/breadcrumbs"));
const prerequisites_1 = __importDefault(require("../_components/course-manipulation/prerequisites"));
const instructors_1 = __importDefault(require("../_components/course-manipulation/instructors"));
const technologies_1 = __importDefault(require("../_components/course-manipulation/technologies"));
const description_field_1 = __importDefault(require("../_components/course-manipulation/description-field"));
const name_field_1 = __importDefault(require("../_components/course-manipulation/name-field"));
const thumbnail_1 = __importDefault(require("../_components/course-manipulation/thumbnail"));
const banner_1 = __importDefault(require("../_components/course-manipulation/banner"));
function Page() {
    var _a, _b, _c;
    const { control, setError, formState: { errors }, handleSubmit, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(create_course_1.default),
        defaultValues: {
            technologies: {},
            prerequisites: [],
            instructors: [],
        },
    });
    const router = (0, navigation_1.useRouter)();
    const createCourse = react_1.api.course.create.useMutation({
        onSuccess: () => {
            router.push("/workspace/admin");
            router.refresh();
        },
    });
    async function submitData({ thumbnail, banner, technologies, prerequisites, name, description, instructors, }) {
        const encodedThumbnail = await (0, to_base64_1.toBase64)(thumbnail);
        const encodedBanner = await (0, to_base64_1.toBase64)(banner);
        const technologiesWithEncodedLogos = await Promise.all(Object.entries(technologies).map(async ([_, data]) => {
            const logo = (await (0, to_base64_1.toBase64)(data.logo));
            return {
                name: data.name,
                logo,
            };
        }));
        const filteredInstructors = instructors.map(({ id, role }) => ({
            id,
            role,
        }));
        createCourse.mutate({
            name,
            prerequisites,
            technologies: technologiesWithEncodedLogos,
            description,
            thumbnail: encodedThumbnail,
            banner: encodedBanner,
            instructors: filteredInstructors,
        });
    }
    return (<div className="py-5">
      <breadcrumbs_1.default items={[{ name: "Courses", href: "/workspace/admin" }, "Create"]} className="mb-4"/>
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
          <button_1.Button type="submit" disabled={createCourse.isPending} aria-disabled={createCourse.isPending}>
            {createCourse.isPending && (<lu_1.LuLoader2 className="me-2 animate-spin"/>)}
            Create
          </button_1.Button>
        </div>
      </form>
    </div>);
}
exports.default = Page;
