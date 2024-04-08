"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigationLinks = void 0;
const jotai_1 = require("jotai");
const hi2_1 = require("react-icons/hi2");
exports.navigationLinks = (0, jotai_1.atom)([
    {
        title: "Home",
        icon: <hi2_1.HiOutlineHome className="text-base"/>,
        href: "/",
    },
    {
        title: "About Us",
        icon: <hi2_1.HiOutlineInformationCircle className="text-base"/>,
        href: "/about-us",
    },
    {
        title: "Courses",
        icon: <hi2_1.HiOutlineRectangleGroup className="text-base"/>,
        href: "/courses",
    },
]);
