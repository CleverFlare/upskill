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
import { GlobalTab, globalTabs } from "@/app/global-tabs";

export const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});

export interface Tab {
  uncheckedIcon: ReactNode;
  checkedIcon: ReactNode;
  notificationsName?: keyof CourseNotification;
}

const tabs: Tab[] = [
  {
    uncheckedIcon: <HiOutlineHome className="text-base" />,
    checkedIcon: <HiHome className="text-base" />,
  },
  {
    uncheckedIcon: <HiOutlineRectangleGroup className="text-base" />,
    checkedIcon: <HiRectangleGroup className="text-base" />,
  },
  {
    uncheckedIcon: <HiOutlineUserPlus className="text-base" />,
    checkedIcon: <HiUserPlus className="text-base" />,
    notificationsName: "requests",
  },
  {
    uncheckedIcon: <HiOutlineUserGroup className="text-base" />,
    checkedIcon: <HiUserGroup className="text-base" />,
  },
  {
    uncheckedIcon: <HiOutlineDocumentText className="text-base" />,
    checkedIcon: <HiDocumentText className="text-base" />,
  },
  {
    uncheckedIcon: <HiOutlineMegaphone className="text-base" />,
    checkedIcon: <HiMegaphone className="text-base" />,
    notificationsName: "announcements",
  },
  {
    uncheckedIcon: <HiBars3BottomLeft className="text-base" />,
    checkedIcon: <HiBars3BottomLeft className="text-base" />,
    notificationsName: "classes",
  },
  {
    uncheckedIcon: <HiOutlineUserGroup className="text-base" />,
    checkedIcon: <HiUserGroup className="text-base" />,
    notificationsName: "leaderboard",
  },
  {
    uncheckedIcon: <HiOutlineUserGroup className="text-base" />,
    checkedIcon: <HiUserGroup className="text-base" />,
    notificationsName: "students",
  },
  {
    uncheckedIcon: <HiOutlineUserPlus className="text-base" />,
    checkedIcon: <HiUserPlus className="text-base" />,
    notificationsName: "requests",
  },
  {
    uncheckedIcon: <HiOutlineClipboardDocumentCheck className="text-base" />,
    checkedIcon: <HiClipboardDocumentCheck className="text-base" />,
    notificationsName: "attendance",
  },
  {
    uncheckedIcon: <HiOutlineClipboardDocumentList className="text-base" />,
    checkedIcon: <HiClipboardDocumentList className="text-base" />,
    notificationsName: "assignments",
  },
  {
    uncheckedIcon: <HiOutlineLightBulb className="text-base" />,
    checkedIcon: <HiLightBulb className="text-base" />,
    notificationsName: "quizzes",
  },
];

export default globalTabs.map((globalTab, index) => ({
  ...globalTab,
  ...tabs[index],
})) as (GlobalTab & Tab)[];
