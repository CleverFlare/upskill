"use client";
import { type ReactNode } from "react";
import {
  HiBars3BottomLeft,
  HiClipboardDocumentCheck,
  HiClipboardDocumentList,
  HiDocumentText,
  HiHome,
  HiLightBulb,
  HiMegaphone,
  HiOutlineClipboardDocumentCheck,
  HiOutlineClipboardDocumentList,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineLightBulb,
  HiOutlineMegaphone,
  HiOutlineRectangleGroup,
  HiOutlineUserGroup,
  HiOutlineUserPlus,
  HiRectangleGroup,
  HiUserGroup,
  HiUserPlus,
} from "react-icons/hi2";
import Pusher from "pusher-js";
import { type CourseNotification } from "@/data/notifications";

export const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});

export interface Tab {
  name: string;
  href: string;
  uncheckedIcon: ReactNode;
  checkedIcon: ReactNode;
  permissions: ("admin" | "instructor" | "student")[];
  isAdmin?: boolean;
  activeOn?: (string | RegExp)[];
  notificationsName?: keyof CourseNotification;
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
    name: "Requests",
    href: "/requests",
    uncheckedIcon: <HiOutlineUserPlus className="text-base" />,
    checkedIcon: <HiUserPlus className="text-base" />,
    permissions: ["admin"],
    notificationsName: "requests",
    isAdmin: true,
  },
  {
    name: "Users",
    href: "/users",
    uncheckedIcon: <HiOutlineUserGroup className="text-base" />,
    checkedIcon: <HiUserGroup className="text-base" />,
    permissions: ["admin"],
    isAdmin: true,
  },
  {
    name: "System Logs",
    href: "/logs",
    uncheckedIcon: <HiOutlineDocumentText className="text-base" />,
    checkedIcon: <HiDocumentText className="text-base" />,
    permissions: ["admin"],
    isAdmin: true,
  },
  {
    name: "Announcements",
    href: "/announcements",
    uncheckedIcon: <HiOutlineMegaphone className="text-base" />,
    checkedIcon: <HiMegaphone className="text-base" />,
    permissions: ["admin", "student", "instructor"],
    notificationsName: "announcements",
  },
  {
    name: "Classes",
    href: "/classes",
    uncheckedIcon: <HiBars3BottomLeft className="text-base" />,
    checkedIcon: <HiBars3BottomLeft className="text-base" />,
    permissions: ["instructor"],
    notificationsName: "classes",
    activeOn: [/^\/workspace\/(.*?)\/classes\/(.*?)$/g],
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    uncheckedIcon: <HiOutlineUserGroup className="text-base" />,
    checkedIcon: <HiUserGroup className="text-base" />,
    permissions: ["student"],
    notificationsName: "leaderboard",
  },
  {
    name: "Students",
    href: "/students",
    uncheckedIcon: <HiOutlineUserGroup className="text-base" />,
    checkedIcon: <HiUserGroup className="text-base" />,
    permissions: ["instructor"],
    notificationsName: "students",
  },
  {
    name: "Attendance",
    href: "/attendance",
    uncheckedIcon: <HiOutlineClipboardDocumentCheck className="text-base" />,
    checkedIcon: <HiClipboardDocumentCheck className="text-base" />,
    permissions: ["instructor"],
    notificationsName: "attendance",
  },
  {
    name: "Assignments",
    href: "/assignments",
    uncheckedIcon: <HiOutlineClipboardDocumentList className="text-base" />,
    checkedIcon: <HiClipboardDocumentList className="text-base" />,
    permissions: ["instructor"],
    notificationsName: "assignments",
  },
  {
    name: "Quizzes",
    href: "/quizzes",
    uncheckedIcon: <HiOutlineLightBulb className="text-base" />,
    checkedIcon: <HiLightBulb className="text-base" />,
    permissions: ["instructor"],
    notificationsName: "quizzes",
  },
];

export default tabs;
