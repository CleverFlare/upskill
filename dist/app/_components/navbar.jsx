"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@/lib/utils");
const container_1 = __importDefault(require("@/components/container"));
const button_1 = require("@/components/ui/button");
const navlink_1 = __importDefault(require("@/app/_components/_parts/navlink"));
const hi2_1 = require("react-icons/hi2");
const eclipse_button_1 = __importDefault(require("@/app/_components/_parts/eclipse-button"));
const jotai_1 = require("jotai");
const navigation_1 = require("@/data/navigation");
const mobile_menu_1 = __importDefault(require("@/app/_components/mobile-menu"));
const logo_1 = __importDefault(require("@/components/logo"));
const link_1 = __importDefault(require("next/link"));
const react_1 = require("next-auth/react");
const authenticated_user_1 = __importDefault(require("./_parts/authenticated-user"));
const lu_1 = require("react-icons/lu");
function Navbar({ className, ...props }) {
    const [navlinks] = (0, jotai_1.useAtom)(navigation_1.navigationLinks);
    const { data: session, status } = (0, react_1.useSession)();
    return (<div className="border-gray/20 flex w-full justify-center border-b py-4" {...props}>
      <container_1.default className={(0, utils_1.cn)("flex w-full items-center justify-between", className)}>
        <logo_1.default />
        <div className=" hidden gap-10 md:flex">
          {navlinks.map((navlink, index) => (<navlink_1.default key={`navlink ${index}`} href={navlink.href}>
              {navlink.title}
            </navlink_1.default>))}
        </div>
        <div className="hidden gap-3 md:flex">
          <eclipse_button_1.default />
          {!session && (<button_1.Button className={(0, utils_1.cn)("flex gap-2", status === "loading" ? "pointer-events-none opacity-50" : "")} asChild>
              <link_1.default href="/login">
                {status != "loading" && (<hi2_1.HiArrowLeftOnRectangle className="text-base"/>)}
                {status === "loading" && (<lu_1.LuLoader2 className="animate-spin text-base"/>)}
                <p>Sign in</p>
              </link_1.default>
            </button_1.Button>)}
          {session && (<authenticated_user_1.default firstName={session.user.firstName} lastName={session.user.lastName} username={session.user.username} image={session.user.image}/>)}
        </div>
        <div className="flex md:hidden">
          <mobile_menu_1.default />
        </div>
      </container_1.default>
    </div>);
}
exports.default = Navbar;
