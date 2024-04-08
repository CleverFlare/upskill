"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const search_bar_1 = __importDefault(require("./_components/search-bar"));
const button_1 = require("@/components/ui/button");
const hi2_1 = require("react-icons/hi2");
const link_1 = __importDefault(require("next/link"));
const course_card_with_options_1 = __importDefault(require("./_components/course-card-with-options"));
const db_1 = require("@/server/db");
async function Page({ searchParams, }) {
    var _a, _b, _c;
    const databaseCoursesData = await db_1.db.course.findMany({
        where: {
            OR: [
                {
                    name: { contains: (_a = searchParams === null || searchParams === void 0 ? void 0 : searchParams.search) !== null && _a !== void 0 ? _a : "" },
                },
                {
                    description: { contains: (_b = searchParams === null || searchParams === void 0 ? void 0 : searchParams.search) !== null && _b !== void 0 ? _b : "" },
                },
                {
                    technologies: {
                        some: { name: { contains: (_c = searchParams === null || searchParams === void 0 ? void 0 : searchParams.search) !== null && _c !== void 0 ? _c : "" } },
                    },
                },
            ],
        },
    });
    return (<div className="flex flex-col gap-4">
      <h2 className="text-4xl font-bold">Courses</h2>
      <p className="text-gray-500">
        Here you can manage all the courses on the platform.
      </p>
      <div className="flex w-full justify-between gap-4">
        <search_bar_1.default />
        <button_1.Button asChild>
          <link_1.default href="/workspace/admin/create">
            <hi2_1.HiPlus className="me-2 text-base"/>
            Create
          </link_1.default>
        </button_1.Button>
      </div>
      <div className="grid grid-cols-1 gap-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {!!databaseCoursesData.length &&
            databaseCoursesData.map((course) => (<course_card_with_options_1.default key={`Course ${course.id}`} id={course.id} href={`/workspace/${course.id}`} thumbnailUrl={course.thumbnail}>
              {course.name}
            </course_card_with_options_1.default>))}
      </div>
    </div>);
}
exports.default = Page;
