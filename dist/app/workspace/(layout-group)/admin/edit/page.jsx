"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("@/server/db");
const client_1 = __importDefault(require("./client"));
const navigation_1 = require("next/navigation");
async function Page({ searchParams, }) {
    if (!searchParams.id)
        return (0, navigation_1.redirect)("/not-found");
    const dbCourseData = await db_1.db.course.findUnique({
        where: { id: searchParams.id },
        include: {
            users: {
                include: {
                    user: true,
                },
            },
        },
    });
    if (!dbCourseData)
        return (0, navigation_1.redirect)("/not-found");
    const technologies = {};
    for (const technology of dbCourseData.technologies) {
        technologies[technology.name] = {
            name: technology.name,
            logo: technology.logoUrl,
            logoId: technology.logoId,
        };
    }
    const filteredInstructors = dbCourseData.users.map(({ user, role }) => ({
        name: `${user.firstName} ${user.lastName}`,
        image: user.image,
        username: user.username,
        role,
        id: user.id,
    }));
    const defaultValues = {
        name: dbCourseData.name,
        banner: dbCourseData.banner,
        description: dbCourseData.description,
        thumbnail: dbCourseData.thumbnail,
        prerequisites: dbCourseData.prerequisites,
        technologies: technologies,
        instructors: filteredInstructors,
    };
    return (<client_1.default defaultValues={defaultValues} id={searchParams.id}/>);
}
exports.default = Page;
