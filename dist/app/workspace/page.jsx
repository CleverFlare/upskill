"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = __importDefault(require("@/components/container"));
const course_card_1 = __importDefault(require("@/components/course-card"));
const button_1 = require("@/components/ui/button");
const auth_1 = require("@/server/auth");
const db_1 = require("@/server/db");
const react_icons_1 = require("@radix-ui/react-icons");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
async function Page() {
    const session = (await (0, auth_1.getServerAuthSession)());
    if (session.user.role === "admin")
        (0, navigation_1.redirect)("/workspace/admin");
    const dbData = await db_1.db.userCourse.findMany({
        where: { userId: session.user.id },
        include: { course: true },
    });
    const courses = dbData.map((userCourseData) => userCourseData.course);
    return (<container_1.default className="flex flex-col gap-7 py-20">
      <div className="flex items-center gap-5">
        <button_1.Button variant="ghost" size="icon" asChild>
          <link_1.default href="/">
            <react_icons_1.ChevronLeftIcon className="text-base"/>
          </link_1.default>
        </button_1.Button>
        <h2 className="text-4xl font-bold capitalize">Your courses</h2>
      </div>
      <div className="grid grid-cols-1 gap-3 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!courses.length && (<h2 className="col-span-full text-2xl font-bold">
            No courses have been found
          </h2>)}
        {!!courses.length &&
            courses.map((course) => (<course_card_1.default href={`/workspace/${course.id}`} thumbnailUrl={course.thumbnail}>
              {course.name}
            </course_card_1.default>))}
      </div>
    </container_1.default>);
}
exports.default = Page;
