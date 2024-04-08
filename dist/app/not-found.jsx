"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = __importDefault(require("@/components/container"));
const button_1 = require("@/components/ui/button");
const link_1 = __importDefault(require("next/link"));
function NotFound() {
    return (<container_1.default className="flex h-screen flex-1 flex-col items-center justify-center gap-4">
      <p className="text-gray-500">Oops! Page not found.</p>
      <h2 className="text-8xl font-bold text-primary">404</h2>
      <p className="text-gray-500">We can't find the page you're looking for.</p>
      <button_1.Button asChild>
        <link_1.default href="/">Back to home</link_1.default>
      </button_1.Button>
    </container_1.default>);
}
exports.default = NotFound;
