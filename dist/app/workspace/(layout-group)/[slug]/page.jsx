"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_details_1 = __importDefault(require("@/app/_components/course-details"));
const db_1 = require("@/server/db");
const navigation_1 = require("next/navigation");
async function Page({ params, }) {
    var _a, _b, _c, _d, _e;
    try {
        const databaseCourseData = await db_1.db.course.findUnique({
            where: {
                id: params.slug,
            },
            include: {
                users: {
                    include: {
                        user: {
                            select: {
                                firstName: true,
                                lastName: true,
                                image: true,
                            },
                        },
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
        return (<course_details_1.default name={(_a = databaseCourseData === null || databaseCourseData === void 0 ? void 0 : databaseCourseData.name) !== null && _a !== void 0 ? _a : ""} bannerUrl={(_b = databaseCourseData === null || databaseCourseData === void 0 ? void 0 : databaseCourseData.banner) !== null && _b !== void 0 ? _b : ""} description={(_c = databaseCourseData === null || databaseCourseData === void 0 ? void 0 : databaseCourseData.description) !== null && _c !== void 0 ? _c : ""} technologies={(_d = databaseCourseData === null || databaseCourseData === void 0 ? void 0 : databaseCourseData.technologies) !== null && _d !== void 0 ? _d : []} prerequisites={(_e = databaseCourseData === null || databaseCourseData === void 0 ? void 0 : databaseCourseData.prerequisites) !== null && _e !== void 0 ? _e : []} instructors={instructors !== null && instructors !== void 0 ? instructors : []}/>);
    }
    catch (err) {
        return (0, navigation_1.redirect)("/not-found");
    }
}
exports.default = Page;
