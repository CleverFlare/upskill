"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const avatar_1 = require("@/components/ui/avatar");
const input_1 = require("@/components/ui/input");
const hi2_1 = require("react-icons/hi2");
const auth_1 = require("@/server/auth");
const eclipse_button_1 = __importDefault(require("@/app/_components/_parts/eclipse-button"));
const sidebar_1 = require("./sidebar");
async function Topbar() {
    var _a, _b, _c, _d;
    const session = await (0, auth_1.getServerAuthSession)();
    return (<div className="col-end-3 row-start-1 flex w-full items-center gap-4 px-4 py-4">
      <div className="flex flex-1 items-center gap-4">
        <sidebar_1.SidebarDrawerButton />
        <form className="relative w-full max-w-[300px]">
          <hi2_1.HiMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
          <input_1.Input placeholder="Search..." className="w-full ps-8"/>
        </form>
      </div>
      <eclipse_button_1.default />
      <avatar_1.Avatar className="h-9 w-9">
        <avatar_1.AvatarImage src={session === null || session === void 0 ? void 0 : session.user.image}/>
        <avatar_1.AvatarFallback>
          {(_b = (_a = session === null || session === void 0 ? void 0 : session.user.firstName[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : "A"}
          {(_d = (_c = session === null || session === void 0 ? void 0 : session.user.firstName[1]) === null || _c === void 0 ? void 0 : _c.toUpperCase()) !== null && _d !== void 0 ? _d : "V"}
        </avatar_1.AvatarFallback>
      </avatar_1.Avatar>
    </div>);
}
exports.default = Topbar;
