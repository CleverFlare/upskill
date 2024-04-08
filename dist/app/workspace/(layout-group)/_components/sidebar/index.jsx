"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarDrawerButton = void 0;
const sheet_1 = require("@/components/ui/sheet");
const sidebar_items_1 = __importDefault(require("./sidebar-items"));
const button_1 = require("@/components/ui/button");
const hi2_1 = require("react-icons/hi2");
function default_1() {
    return (<div className="row-span-2 hidden h-full w-[270px] flex-col gap-6 bg-gray-50 p-5 lg:flex dark:bg-gray-900">
      <sidebar_items_1.default />
    </div>);
}
exports.default = default_1;
function SidebarDrawerButton() {
    return (<sheet_1.Sheet>
      <sheet_1.SheetTrigger asChild>
        <button_1.Button variant="outline" size="icon" className="lg:hidden">
          <hi2_1.HiBars3 />
        </button_1.Button>
      </sheet_1.SheetTrigger>
      <sheet_1.SheetContent side="left" className="flex w-[270px] flex-col gap-6 bg-gray-50 p-5 dark:bg-gray-900 ">
        <sidebar_items_1.default />
      </sheet_1.SheetContent>
    </sheet_1.Sheet>);
}
exports.SidebarDrawerButton = SidebarDrawerButton;
