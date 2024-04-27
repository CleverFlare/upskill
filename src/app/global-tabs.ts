export interface GlobalTab {
  name: string;
  href: string;
  permissions: ("admin" | "instructor" | "student")[];
  isAdmin?: boolean;
  activeOn?: (string | RegExp)[];
}

export const globalTabs: GlobalTab[] = [
  {
    name: "Home",
    href: "/",
    permissions: ["student", "admin", "instructor"],
  },
  {
    name: "Courses",
    href: "/",
    permissions: ["admin"],
    isAdmin: true,
    activeOn: ["/workspace/admin/create", "/workspace/admin/edit"],
  },
  {
    name: "Requests",
    href: "/requests",
    permissions: ["admin"],
    isAdmin: true,
  },
  {
    name: "Users",
    href: "/users",
    permissions: ["admin"],
    isAdmin: true,
  },
  {
    name: "System Logs",
    href: "/logs",
    permissions: ["admin"],
    isAdmin: true,
  },
  {
    name: "Announcements",
    href: "/announcements",
    permissions: ["admin", "student", "instructor"],
  },
  {
    name: "Classes",
    href: "/classes",
    permissions: ["instructor", "student", "admin"],
    activeOn: [/^\/workspace\/(.*?)\/classes\/(.*?)$/g],
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    permissions: ["student", "instructor", "admin"],
  },
  {
    name: "Students",
    href: "/students",
    permissions: ["instructor"],
  },
  {
    name: "Requests",
    href: "/requests",
    permissions: ["instructor"],
  },
  {
    name: "Attendance",
    href: "/attendance",
    permissions: ["instructor"],
  },
  {
    name: "Assignments",
    href: "/assignments",
    permissions: ["instructor", "student", "admin"],
    activeOn: [/^\/workspace\/(.*?)\/assignments\/(.*?)$/gi],
  },
  {
    name: "Quizzes",
    href: "/quizzes",
    permissions: ["instructor", "student", "admin"],
    activeOn: [/^\/workspace\/(.*?)\/quizzes\/(.*?)$/gi],
  },
];
