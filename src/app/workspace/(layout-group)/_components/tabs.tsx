import { type ReactNode } from "react";
import {
  HiHome,
  HiMegaphone,
  HiOutlineHome,
  HiOutlineMegaphone,
  HiOutlineRectangleGroup,
  HiRectangleGroup,
} from "react-icons/hi2";

interface Tab {
  name: string;
  href: string;
  uncheckedIcon: ReactNode;
  checkedIcon: ReactNode;
  permissions: ("admin" | "instructor" | "student")[];
  isAdmin?: boolean;
  activeOn?: string[];
}

const tabs: Tab[] = [
  {
    name: "Home",
    href: "/",
    uncheckedIcon: <HiOutlineHome className="text-base" />,
    checkedIcon: <HiHome className="text-base" />,
    permissions: ["student", "admin", "instructor"],
  },
  {
    name: "Courses",
    href: "/",
    uncheckedIcon: <HiOutlineRectangleGroup className="text-base" />,
    checkedIcon: <HiRectangleGroup className="text-base" />,
    permissions: ["admin"],
    isAdmin: true,
    activeOn: ["/workspace/admin/create", "/workspace/admin/edit"],
  },
  {
    name: "Announcements",
    href: "/announcements",
    uncheckedIcon: <HiOutlineMegaphone className="text-base" />,
    checkedIcon: <HiMegaphone className="text-base" />,
    permissions: ["admin", "student", "instructor"],
  },
];

export default tabs;
