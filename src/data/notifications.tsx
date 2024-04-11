import { atom } from "jotai";

export type CourseNotification = Record<string, number>;

export const notifications = atom<Record<string, CourseNotification>>({});
