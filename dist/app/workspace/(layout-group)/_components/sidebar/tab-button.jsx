"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const skeleton_1 = require("@/components/ui/skeleton");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const react_1 = require("react");
function TabButton({ uncheckedIcon, checkedIcon, isAdmin, name, activeOn, href, }) {
    const [checked, setChecked] = (0, react_1.useState)(false);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const path = (0, navigation_1.usePathname)();
    const pathArray = path
        .trim()
        .replace(/^\/+|\/+$/g, "")
        .split("/");
    const currentPath = `/${pathArray[0]}/${pathArray[1]}${href.replace(/\/+$/g, "")}`;
    (0, react_1.useEffect)(() => {
        if (path === currentPath || (activeOn && activeOn.includes(path)))
            setChecked(true);
        else
            setChecked(false);
        setIsLoading(false);
    }, [path]);
    if (isAdmin && pathArray[1] !== "admin")
        return;
    if (!isAdmin && pathArray[1] === "admin")
        return;
    if (isLoading)
        return <skeleton_1.Skeleton className="h-10 w-full rounded-lg"/>;
    return (<button_1.Button variant={checked ? "default" : "ghost"} className="justify-start gap-2 px-4" size="lg" asChild>
      <link_1.default href={currentPath}>
        {checked && checkedIcon}
        {!checked && uncheckedIcon}
        {name}
      </link_1.default>
    </button_1.Button>);
}
exports.default = TabButton;
