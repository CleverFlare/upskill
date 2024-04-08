"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const progress_1 = require("@/components/ui/progress");
const react_1 = require("next-auth/react");
const navigation_1 = require("next/navigation");
const react_2 = require("react");
const tabs_1 = __importDefault(require("../tabs"));
const button_1 = require("@/components/ui/button");
const link_1 = __importDefault(require("next/link"));
const hi2_1 = require("react-icons/hi2");
const lu_1 = require("react-icons/lu");
const logo_1 = __importDefault(require("@/components/logo"));
const tab_button_1 = __importDefault(require("./tab-button"));
function SidebarItems() {
    const [isLoading, setIsLoading] = (0, react_2.useState)(false);
    const router = (0, navigation_1.useRouter)();
    async function handleSignOut() {
        setIsLoading(true);
        await (0, react_1.signOut)({ redirect: false });
        router.refresh();
    }
    const path = (0, navigation_1.usePathname)();
    const pathArray = path
        .trim()
        .replace(/^\/+|\/$/g, "")
        .split("/");
    const { data: session } = (0, react_1.useSession)();
    const isAdminPath = pathArray[1] === "admin";
    const isAdmin = (session === null || session === void 0 ? void 0 : session.user.role) === "admin";
    return (<>
      <logo_1.default />
      {!isAdminPath && (<div className="flex flex-col gap-2">
          <p className="text-xs font-bold uppercase text-gray-700 dark:text-gray-400">
            progress
          </p>
          <progress_1.Progress value={50}/>
        </div>)}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold uppercase text-gray-700 dark:text-gray-400">
          section
        </p>
        {tabs_1.default.map((tab) => (<tab_button_1.default {...tab}/>))}
      </div>
      <div className="mt-auto flex w-full flex-col gap-3">
        {!isAdminPath && isAdmin && (<button_1.Button variant="outline" className="w-full capitalize" asChild>
            <link_1.default href="/workspace/admin">
              <hi2_1.HiOutlineWindow className="me-2"/>
              Admin Panel
            </link_1.default>
          </button_1.Button>)}
        <button_1.Button variant="outline" className="w-full capitalize" asChild>
          <link_1.default href="/">
            <hi2_1.HiArrowUturnLeft className="me-2"/>
            Back to website
          </link_1.default>
        </button_1.Button>
        <button_1.Button variant="destructive" className="flex w-full gap-2" onClick={() => handleSignOut()} disabled={isLoading}>
          {!isLoading && <hi2_1.HiArrowRightOnRectangle />}
          {isLoading && <lu_1.LuLoader2 className="animate-spin"/>}
          Sign Out
        </button_1.Button>
      </div>
    </>);
}
exports.default = SidebarItems;
