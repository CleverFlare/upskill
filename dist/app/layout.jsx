"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
require("@/app/globals.css");
const google_1 = require("next/font/google");
const react_1 = require("@/trpc/react");
const utils_1 = require("@/lib/utils");
const theme_provider_1 = require("@/components/theme-provider");
const jotai_1 = require("jotai");
const sonner_1 = require("@/components/ui/sonner");
const session_provider_1 = __importDefault(require("./session-provider"));
const inter = (0, google_1.Inter)({
    subsets: ["latin"],
    variable: "--font-sans",
});
exports.metadata = {
    title: "Upskill",
    description: "Upskill is your on-demand platform to future-proof your career.  Upskill offers a wide range of courses to help you learn new skills, advance your knowledge, and stay competitive in today's job market.",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};
function RootLayout({ children, }) {
    return (<html lang="en" suppressHydrationWarning>
      <body className={(0, utils_1.cn)("flex min-h-screen flex-col font-sans", inter.variable)}>
        <jotai_1.Provider>
          <session_provider_1.default>
            <theme_provider_1.ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <react_1.TRPCReactProvider>
                {children}
                <sonner_1.Toaster />
              </react_1.TRPCReactProvider>
            </theme_provider_1.ThemeProvider>
          </session_provider_1.default>
        </jotai_1.Provider>
      </body>
    </html>);
}
exports.default = RootLayout;
