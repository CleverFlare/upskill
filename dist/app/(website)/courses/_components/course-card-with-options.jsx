"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_card_1 = __importDefault(require("@/components/course-card"));
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const utils_1 = require("@/lib/utils");
const react_1 = require("@/trpc/react");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const react_2 = require("react");
const hi2_1 = require("react-icons/hi2");
function CourseCardWithActions({ href, children, thumbnailUrl, id, }) {
    const [deleted, setDeleted] = (0, react_2.useState)(false);
    const router = (0, navigation_1.useRouter)();
    const { mutate } = react_1.api.course.delete.useMutation({
        onSuccess: () => {
            router.refresh();
        },
    });
    async function handleDeleteCourse() {
        mutate({ id });
        setDeleted(true);
    }
    return (<div className={(0, utils_1.cn)("group relative aspect-video h-full w-full", deleted ? "pointer-events-none opacity-50" : "")}>
      <course_card_1.default href={href} thumbnailUrl={thumbnailUrl}>
        {children}
      </course_card_1.default>
      <dropdown_menu_1.DropdownMenu>
        <dropdown_menu_1.DropdownMenuTrigger asChild>
          <button_1.Button variant="secondary" size="icon" className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100" disabled={deleted}>
            <hi2_1.HiEllipsisVertical className="text-xl"/>
          </button_1.Button>
        </dropdown_menu_1.DropdownMenuTrigger>
        <dropdown_menu_1.DropdownMenuContent align="end">
          <dropdown_menu_1.DropdownMenuLabel>Options</dropdown_menu_1.DropdownMenuLabel>
          <dropdown_menu_1.DropdownMenuSeparator />
          <dropdown_menu_1.DropdownMenuItem className="flex gap-2" asChild>
            <link_1.default href={`/courses/edit?id=${id}`}>
              <hi2_1.HiPencil />
              Edit
            </link_1.default>
          </dropdown_menu_1.DropdownMenuItem>
          <dropdown_menu_1.DropdownMenuItem className="flex gap-2" onClick={() => handleDeleteCourse()}>
            <hi2_1.HiTrash />
            Delete
          </dropdown_menu_1.DropdownMenuItem>
        </dropdown_menu_1.DropdownMenuContent>
      </dropdown_menu_1.DropdownMenu>
    </div>);
}
exports.default = CourseCardWithActions;
