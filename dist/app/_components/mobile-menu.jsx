"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const drawer_1 = require("@/components/ui/drawer");
const button_1 = require("@/components/ui/button");
const hi2_1 = require("react-icons/hi2");
const eclipse_button_1 = __importDefault(require("@/app/_components/_parts/eclipse-button"));
const navlink_1 = __importDefault(require("@/app/_components/_parts/navlink"));
const separator_1 = require("@/components/ui/separator");
const jotai_1 = require("jotai");
const navigation_1 = require("@/data/navigation");
const react_1 = require("next-auth/react");
const avatar_1 = require("@/components/ui/avatar");
const link_1 = __importDefault(require("next/link"));
const react_2 = require("react");
const lu_1 = require("react-icons/lu");
const navigation_2 = require("next/navigation");
function MobileMenuButton() {
    var _a, _b;
    const [navlinks] = (0, jotai_1.useAtom)(navigation_1.navigationLinks);
    const { data: session } = (0, react_1.useSession)();
    const [isSignOutLoading, setSignOutLoading] = (0, react_2.useState)(false);
    const router = (0, navigation_2.useRouter)();
    async function handleSignOut() {
        setSignOutLoading(true);
        await (0, react_1.signOut)({
            redirect: false,
        });
        setSignOutLoading(false);
        router.refresh();
    }
    return (<drawer_1.Drawer>
      <drawer_1.DrawerTrigger asChild>
        <button_1.Button variant="outline" size="icon">
          <hi2_1.HiBars3 />
        </button_1.Button>
      </drawer_1.DrawerTrigger>
      <drawer_1.DrawerContent>
        <div className="flex flex-col gap-4 p-4">
          {navlinks.map((navlink, index) => (<navlink_1.default key={`navlink ${index}`} href={navlink.href} className="w-full" buttonClassName="w-full justify-start gap-2" size="default">
              {navlink.icon}
              {navlink.title}
            </navlink_1.default>))}
          {!!session && (<>
              <separator_1.Separator decorative/>
              <button_1.Button variant="ghost" className="flex w-full flex-1 justify-start gap-2" asChild>
                <link_1.default href="/workspace">
                  <hi2_1.HiOutlineWindow className="text-base"/>
                  Workspace
                </link_1.default>
              </button_1.Button>
              <button_1.Button variant="destructive" className="flex w-full flex-1 justify-start gap-2" disabled={isSignOutLoading} onClick={() => handleSignOut()}>
                {!isSignOutLoading && (<hi2_1.HiArrowRightOnRectangle className="text-base"/>)}
                {isSignOutLoading && <lu_1.LuLoader2 className="animate-spin"/>}
                <p>Sign Out</p>
              </button_1.Button>
            </>)}
          <separator_1.Separator decorative/>
          <div className="flex items-center justify-between gap-3">
            {!session && (<button_1.Button variant="default" className="flex w-full flex-1 gap-2" asChild>
                <link_1.default href="/login">
                  <hi2_1.HiArrowLeftOnRectangle className="text-base"/>
                  <p>Sign In</p>
                </link_1.default>
              </button_1.Button>)}
            {!!session && (<div className="flex gap-4">
                <avatar_1.Avatar>
                  <avatar_1.AvatarImage src={session.user.image}/>
                  <avatar_1.AvatarFallback>
                    {(_a = session.user.firstName[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()}
                    {(_b = session.user.lastName[1]) === null || _b === void 0 ? void 0 : _b.toUpperCase()}
                  </avatar_1.AvatarFallback>
                </avatar_1.Avatar>
                <div className="flex flex-col">
                  <p className="text-base">
                    {session.user.firstName} {session.user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {session.user.username}
                  </p>
                </div>
              </div>)}
            <eclipse_button_1.default />
          </div>
        </div>
      </drawer_1.DrawerContent>
    </drawer_1.Drawer>);
}
exports.default = MobileMenuButton;
