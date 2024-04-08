"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_details_1 = __importDefault(require("@/app/_components/course-details"));
const container_1 = __importDefault(require("@/components/container"));
const button_1 = require("@/components/ui/button");
const auth_1 = require("@/server/auth");
const db_1 = require("@/server/db");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const hi2_1 = require("react-icons/hi2");
async function Page({ params }) {
    var _a, _b, _c, _d, _e;
    try {
        const session = await (0, auth_1.getServerAuthSession)();
        const databaseCourseData = await db_1.db.course.findUnique({
            where: {
                id: params.slug,
            },
            include: {
                users: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (!databaseCourseData)
            return (0, navigation_1.redirect)("/not-found");
        const instructors = databaseCourseData.users.map(({ user, role }) => ({
            name: `${user.firstName} ${user.lastName}`,
            image: user.image,
            role: role,
        }));
        const userCourseRecord = (session === null || session === void 0 ? void 0 : session.user.role) !== "admin"
            ? await db_1.db.userCourse.findFirst({
                where: {
                    userId: session === null || session === void 0 ? void 0 : session.user.id,
                    courseId: databaseCourseData.id,
                },
            })
            : undefined;
        const hasCourse = !!userCourseRecord || (session === null || session === void 0 ? void 0 : session.user.role) === "admin";
        return (<container_1.default className="flex flex-col gap-10 py-5">
        <course_details_1.default name={(_a = databaseCourseData === null || databaseCourseData === void 0 ? void 0 : databaseCourseData.name) !== null && _a !== void 0 ? _a : ""} bannerUrl={(_b = databaseCourseData === null || databaseCourseData === void 0 ? void 0 : databaseCourseData.banner) !== null && _b !== void 0 ? _b : ""} description={(_c = databaseCourseData === null || databaseCourseData === void 0 ? void 0 : databaseCourseData.description) !== null && _c !== void 0 ? _c : ""} technologies={(_d = databaseCourseData === null || databaseCourseData === void 0 ? void 0 : databaseCourseData.technologies) !== null && _d !== void 0 ? _d : []} prerequisites={(_e = databaseCourseData === null || databaseCourseData === void 0 ? void 0 : databaseCourseData.prerequisites) !== null && _e !== void 0 ? _e : []} instructors={instructors !== null && instructors !== void 0 ? instructors : []}/>
        {!session && (<button_1.Button variant="outline" asChild>
            <link_1.default href="/login">
              <hi2_1.HiArrowLeftOnRectangle className="me-2 text-base"/>
              <p>Sign in to enroll</p>
            </link_1.default>
          </button_1.Button>)}
        {!!session && !hasCourse && (<button_1.Button>
            <hi2_1.HiArrowLeftOnRectangle className="me-2 text-base"/>
            Enroll to this course
          </button_1.Button>)}
        {!!session && hasCourse && (<button_1.Button asChild>
            <link_1.default href={`/workspace/${databaseCourseData.id}`}>
              <hi2_1.HiOutlineWindow className="me-2 text-base"/>
              View in workspace
            </link_1.default>
          </button_1.Button>)}
      </container_1.default>);
    }
    catch (err) {
        return (0, navigation_1.redirect)("/not-found");
    }
}
exports.default = Page;
