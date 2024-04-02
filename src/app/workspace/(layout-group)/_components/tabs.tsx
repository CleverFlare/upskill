import { type ReactNode } from "react";
import {
  HiHome,
  HiOutlineHome,
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
  },
];

export default tabs;
