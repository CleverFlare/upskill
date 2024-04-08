"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("@/server/db");
const announcement_form_1 = __importDefault(require("./_component/announcement-form"));
const announcement_with_actions_1 = __importDefault(require("./_component/announcement-with-actions"));
const test_comp_1 = __importDefault(require("./_component/test-comp"));
async function Page({ params, }) {
    const announcementsData = await db_1.db.announcement.findMany({
        where: { courseId: params.slug },
        orderBy: { createdAt: "desc" },
    });
    return (<div className="flex h-full w-full flex-col justify-end">
      <div className="flex w-full flex-1 flex-col gap-4 overflow-auto py-4">
        {!announcementsData.length && (<div className="flex h-full w-full items-center justify-center">
            <p className="text-3xl font-bold text-gray-400">Empty</p>
          </div>)}
        {announcementsData.map(({ title, image, content, id }) => (<announcement_with_actions_1.default key={id} id={id} title={title} createdAt={new Date().toISOString()} image={image !== null && image !== void 0 ? image : undefined}>
            {content}
          </announcement_with_actions_1.default>))}
      </div>
      <test_comp_1.default />
      <announcement_form_1.default courseId={params.slug}/>
    </div>);
}
exports.default = Page;
