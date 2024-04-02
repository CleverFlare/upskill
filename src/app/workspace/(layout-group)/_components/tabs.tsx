import { type ReactNode } from "react";
import { HiOutlineRectangleGroup, HiRectangleGroup } from "react-icons/hi2";

interface Tab {
  name: string;
  href: string;
  uncheckedIcon: ReactNode;
  checkedIcon: ReactNode;
  permissions: ("admin" | "instructor" | "student")[];
}

const tabs: Tab[] = [
  // {
  //   name: "Home",
  //   href: "/",
  //   uncheckedIcon: <HiOutlineHome className="text-base" />,
  //   checkedIcon: <HiHome className="text-base" />,
  //   permission: ["student", "admin", "instructor"],
  // },
  // {
  //   name: "Announcements",
  //   href: "/announcements",
  //   uncheckedIcon: <HiOutlineMegaphone className="text-base" />,
  //   checkedIcon: <HiMegaphone className="text-base" />,
  //   permission: ["student", "admin", "instructor"]
  // },
  {
    name: "Courses",
    href: "/",
    uncheckedIcon: <HiOutlineRectangleGroup />,
    checkedIcon: <HiRectangleGroup />,
    permissions: ["admin"],
  },
];

export default tabs;
