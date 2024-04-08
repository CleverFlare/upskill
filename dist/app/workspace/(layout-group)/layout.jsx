"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const topbar_1 = __importDefault(require("./_components/topbar"));
const sidebar_1 = __importDefault(require("./_components/sidebar"));
async function Layout({ children }) {
    return (<div className="flex h-screen flex-col lg:grid lg:grid-cols-[270px_1fr] lg:grid-rows-[auto_1fr]">
      <sidebar_1.default />
      <topbar_1.default />
      <div className="col-start-2 row-start-2 flex-1 overflow-y-auto px-4 py-4">
        {children}
      </div>
    </div>);
}
exports.default = Layout;
