"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const avatar_1 = require("@/components/ui/avatar");
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const react_1 = require("next-auth/react");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const hi2_1 = require("react-icons/hi2");
function AuthenticatedUser({ firstName, lastName, username, image, }) {
    const router = (0, navigation_1.useRouter)();
    async function handleSignOut() {
        await (0, react_1.signOut)({
            redirect: false,
        });
        router.refresh();
    }
    return (<dropdown_menu_1.DropdownMenu>
      <dropdown_menu_1.DropdownMenuTrigger asChild>
        <button_1.Button variant="outline" size="icon" className="relative overflow-hidden rounded-full">
          <hi2_1.HiOutlineUser className="text-lg text-gray-500"/>
          {!!image && (<image_1.default src={image} width={50} height={50} alt="avatar" className="absolute left-0 top-0 h-full w-full object-cover"/>)}
        </button_1.Button>
      </dropdown_menu_1.DropdownMenuTrigger>
      <dropdown_menu_1.DropdownMenuContent align="end" className="w-screen max-w-[300px]">
        <div className="flex gap-2 p-2">
          <avatar_1.Avatar>
            <avatar_1.AvatarImage src={image} className="object-cover"/>
            <avatar_1.AvatarFallback>
              {firstName[0].toUpperCase() + lastName[0].toUpperCase()}
            </avatar_1.AvatarFallback>
          </avatar_1.Avatar>
          <div className="flex flex-col">
            <p className="text-base">
              {firstName} {lastName}
            </p>
            <p className="text-sm text-muted-foreground">{username}</p>
          </div>
        </div>
        <dropdown_menu_1.DropdownMenuSeparator />
        <dropdown_menu_1.DropdownMenuItem asChild>
          <link_1.default href="/workspace">
            <hi2_1.HiOutlineWindow className="me-2 text-base"/>
            Workspace
          </link_1.default>
        </dropdown_menu_1.DropdownMenuItem>
        <dropdown_menu_1.DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive" onClick={handleSignOut}>
          <hi2_1.HiArrowRightOnRectangle className="me-2 text-base"/>
          Logout
        </dropdown_menu_1.DropdownMenuItem>
      </dropdown_menu_1.DropdownMenuContent>
    </dropdown_menu_1.DropdownMenu>);
}
exports.default = AuthenticatedUser;
