"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const announcement_1 = __importDefault(require("@/components/announcement"));
const button_1 = require("@/components/ui/button");
const utils_1 = require("@/lib/utils");
const react_1 = require("@/trpc/react");
const navigation_1 = require("next/navigation");
const react_2 = require("react");
const hi2_1 = require("react-icons/hi2");
function AnnouncementWithActions({ id, ...props }) {
    const [deleted, setDeleted] = (0, react_2.useState)(false);
    const router = (0, navigation_1.useRouter)();
    const { mutate, isPending } = react_1.api.course.deleteAnnouncement.useMutation({
        onSuccess: () => {
            setDeleted(true);
            router.refresh();
        },
    });
    function handleDelete() {
        mutate({ id });
    }
    return (<>
      {!deleted && (<div className={(0, utils_1.cn)("group relative", isPending ? "pointer-events-none opacity-50" : "")}>
          <announcement_1.default {...props}/>
          <button_1.Button variant="destructive" size="icon" className="absolute right-5 top-5 opacity-0 transition-opacity group-hover:opacity-100" onClick={() => handleDelete()}>
            <hi2_1.HiTrash className="text-base"/>
          </button_1.Button>
        </div>)}
    </>);
}
exports.default = AnnouncementWithActions;
