"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = __importDefault(require("@/components/container"));
const logo_1 = __importDefault(require("@/components/logo"));
const login_1 = __importDefault(require("./_components/login"));
async function Page() {
    return (<container_1.default className="flex h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-[320px] flex-col gap-5">
        <logo_1.default />
        <p className="text-3xl font-bold">Login</p>
        <login_1.default />
      </div>
    </container_1.default>);
}
exports.default = Page;
