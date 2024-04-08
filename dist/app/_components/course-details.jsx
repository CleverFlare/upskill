"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const team_member_card_1 = __importDefault(require("@/components/team-member-card"));
const tech_card_1 = __importDefault(require("@/components/tech-card"));
const image_1 = __importDefault(require("next/image"));
function CourseDetails({ name, bannerUrl, description, technologies, prerequisites, instructors, ...props }) {
    return (<div className="flex flex-col gap-10" {...props}>
      <div className="relative h-[217px] w-full overflow-hidden rounded-xl p-5">
        <p className="z-20 text-4xl text-border text-white">{name}</p>
        <image_1.default src={bannerUrl} layout="fill" objectFit="cover" objectPosition="center" className="-z-10" alt="banner"/>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
          track description
        </p>
        <p className="text-gray-500 dark:text-gray-300">{description}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
          technologies
        </p>
        <div className="box-content flex w-full snap-x snap-mandatory flex-wrap gap-4 overflow-x-auto pb-2 md:overflow-x-visible">
          {technologies.map((technology) => (<tech_card_1.default {...technology}/>))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
          team
        </p>
        <div className="box-content flex w-full snap-x snap-mandatory flex-wrap gap-4 overflow-x-auto pb-2 md:overflow-x-visible">
          {instructors.map((instructor) => {
            var _a;
            return (<team_member_card_1.default role={instructor.role} name={instructor.name} image={(_a = instructor.image) !== null && _a !== void 0 ? _a : undefined}/>);
        })}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
          prerequisites
        </p>
        <div className="flex flex-col gap-[10px]">
          {prerequisites.map((prerequisite, index) => (<div className="flex gap-2">
              <p className="h-full w-5 text-xl font-bold text-primary">
                {index + 1}
              </p>
              <p className="text-gray-500 dark:text-gray-300">{prerequisite}</p>
            </div>))}
        </div>
      </div>
    </div>);
}
exports.default = CourseDetails;
