"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = __importDefault(require("@/components/container"));
const db_1 = require("@/server/db");
const search_bar_1 = __importDefault(require("./_components/search-bar"));
const course_card_with_options_1 = __importDefault(require("./_components/course-card-with-options"));
async function Courses({ searchParams, }) {
    const searchParam = !!(searchParams === null || searchParams === void 0 ? void 0 : searchParams.search)
        ? Array.isArray(searchParams.search)
            ? searchParams.search[0]
            : searchParams.search
        : "";
    const databaseCoursesData = await db_1.db.course.findMany({
        where: {
            name: {
                contains: searchParam,
            },
        },
    });
    return (<container_1.default className="flex flex-col gap-8 py-10">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold text-primary">Courses</p>
        <h2 className="text-4xl font-bold">Unlock your potential</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Skill up, game on! Level up your life with UpSkill's diverse courses.
        </p>
      </div>
      <search_bar_1.default />
      {!!searchParam && (<p className="text-2xl font-bold">Search Results of "{searchParam}"</p>)}
      <div className="grid grid-cols-1 gap-3 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!!databaseCoursesData.length &&
            databaseCoursesData.map((course) => (<course_card_with_options_1.default key={`Course ${course.id}`} id={course.id} href={`/courses/${course.id}`} thumbnailUrl={course.thumbnail}>
              {course.name}
            </course_card_with_options_1.default>))}
      </div>
    </container_1.default>);
}
exports.default = Courses;
