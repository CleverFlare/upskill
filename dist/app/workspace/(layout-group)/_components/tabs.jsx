"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hi2_1 = require("react-icons/hi2");
const tabs = [
    {
        name: "Home",
        href: "/",
        uncheckedIcon: <hi2_1.HiOutlineHome className="text-base"/>,
        checkedIcon: <hi2_1.HiHome className="text-base"/>,
        permissions: ["student", "admin", "instructor"],
    },
    {
        name: "Courses",
        href: "/",
        uncheckedIcon: <hi2_1.HiOutlineRectangleGroup className="text-base"/>,
        checkedIcon: <hi2_1.HiRectangleGroup className="text-base"/>,
        permissions: ["admin"],
        isAdmin: true,
        activeOn: ["/workspace/admin/create", "/workspace/admin/edit"],
    },
    {
        name: "Announcements",
        href: "/announcements",
        uncheckedIcon: <hi2_1.HiOutlineMegaphone className="text-base"/>,
        checkedIcon: <hi2_1.HiMegaphone className="text-base"/>,
        permissions: ["admin", "student", "instructor"],
    },
];
exports.default = tabs;
