"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const hi2_1 = require("react-icons/hi2");
const button_1 = require("@/components/ui/button");
const next_themes_1 = require("next-themes");
function EclipseButton() {
    const { setTheme, theme } = (0, next_themes_1.useTheme)();
    function handleToggleTheme() {
        if (theme === "dark")
            setTheme("light");
        else
            setTheme("dark");
    }
    return (<button_1.Button variant="outline" size="icon" className="relative" onClick={handleToggleTheme}>
      <hi2_1.HiOutlineMoon className="scale-100 transition-all dark:scale-0"/>
      <hi2_1.HiOutlineSun className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 transition-all dark:scale-100"/>
    </button_1.Button>);
}
exports.default = EclipseButton;
