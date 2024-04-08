"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const navbar_1 = __importDefault(require("@/app/_components/navbar"));
function RootLayout({ children, }) {
    return (<>
      <navbar_1.default />
      {children}
    </>);
}
exports.default = RootLayout;
