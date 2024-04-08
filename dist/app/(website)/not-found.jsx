"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@/app/globals.css");
const container_1 = __importDefault(require("@/components/container"));
function NotFound() {
    return (<container_1.default className="flex h-screen flex-1 items-center justify-center">
      <p className="text-gray-500">Oops! Page not found.</p>
      <h2 className="text-5xl text-primary">404</h2>
    </container_1.default>);
}
exports.default = NotFound;
