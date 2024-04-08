"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = __importDefault(require("@/components/container"));
const button_1 = require("@/components/ui/button");
const link_1 = __importDefault(require("next/link"));
const hi2_1 = require("react-icons/hi2");
function Page() {
    return (<container_1.default className="flex h-screen items-center justify-center">
      <div className="flex w-full max-w-[450px] flex-col items-start gap-5">
        <h2 className="text-3xl font-bold">🎉 Successful Submission</h2>
        <p className="text-gray-500">
          Your registration request have been successfully submitted. We’ll send
          you an email if you’re approved or rejected, so keep an eye on your
          inbox.
        </p>
        <button_1.Button asChild>
          <link_1.default href="/">
            <hi2_1.HiChevronLeft className="me-2 text-base"/>
            Back to website
          </link_1.default>
        </button_1.Button>
      </div>
    </container_1.default>);
}
exports.default = Page;
