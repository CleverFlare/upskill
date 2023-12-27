import { atom } from "jotai";
import type { ReactNode } from "react";
import {
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineRectangleGroup,
} from "react-icons/hi2";

type NavigationLinkType = {
  title: string;
  icon: ReactNode;
  href: string;
};

export const navigationLinks = atom<NavigationLinkType[]>([
  {
    title: "Home",
    icon: <HiOutlineHome className="text-lg" />,
    href: "/",
  },
  {
    title: "About Us",
    icon: <HiOutlineInformationCircle className="text-lg" />,
    href: "/about-us",
  },
  {
    title: "Courses",
    icon: <HiOutlineRectangleGroup className="text-lg" />,
    href: "/courses",
  },
]);
