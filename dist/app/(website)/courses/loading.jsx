"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCardSkeleton = void 0;
const container_1 = __importDefault(require("@/components/container"));
const search_bar_1 = __importDefault(require("./_components/search-bar"));
const skeleton_1 = require("@/components/ui/skeleton");
function CourseCardSkeleton() {
    return (<div className="space-y-4">
      <skeleton_1.Skeleton className="aspect-video w-full rounded-xl"/>
      <div className="space-y-4">
        <skeleton_1.Skeleton className="h-4 w-1/2"/>
      </div>
    </div>);
}
exports.CourseCardSkeleton = CourseCardSkeleton;
function Page({ searchParams, }) {
    const searchParam = !!(searchParams === null || searchParams === void 0 ? void 0 : searchParams.search)
        ? Array.isArray(searchParams.search)
            ? searchParams.search[0]
            : searchParams.search
        : "";
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
      </div>
    </container_1.default>);
}
exports.default = Page;
