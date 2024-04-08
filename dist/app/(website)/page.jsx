"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = __importDefault(require("@/components/container"));
const home_svg_1 = __importDefault(require("@/components/home-svg"));
const button_1 = require("@/components/ui/button");
const auth_1 = require("@/server/auth");
const link_1 = __importDefault(require("next/link"));
const hi2_1 = require("react-icons/hi2");
// import { CreatePost } from "@/app/_components/create-post";
// import { getServerAuthSession } from "@/server/auth";
// import { api } from "@/trpc/server";
async function Home() {
    const session = await (0, auth_1.getServerAuthSession)();
    return (<main className="flex flex-1 overflow-hidden">
      <container_1.default className="relative flex h-auto flex-1 flex-col py-5">
        <div className="z-10 flex h-full w-full flex-col items-center justify-center gap-6 lg:mt-[150px] lg:h-auto lg:w-1/2 lg:items-start lg:justify-normal">
          <h1 className="text-center text-4xl font-bold sm:text-6xl lg:text-start">
            <span className="text-primary">Learn from the best</span> and get
            ahead in your field
          </h1>
          <p className="text-center text-gray-600 lg:text-start dark:text-gray-400">
            Welcome to Upskill, the only platform you need to unlock your true
            potential and land your dream job, you’ll find all the necessary
            skills required for your career in comprehensible set of courses
            instructed by leading names in the fields.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button_1.Button variant="ghost" asChild className="flex gap-2">
              <link_1.default href="about-us">
                Learn More About Us
                <hi2_1.HiArrowRight className="text-lg"/>
              </link_1.default>
            </button_1.Button>
            {!session && (<button_1.Button className="flex gap-2" asChild>
                <link_1.default href="/login">
                  <hi2_1.HiArrowLeftOnRectangle className="text-lg"/>
                  Sign in now
                </link_1.default>
              </button_1.Button>)}
            {!!session && (<button_1.Button className="flex gap-2" asChild>
                <link_1.default href="/workspace">
                  <hi2_1.HiOutlineWindow className="text-base"/>
                  Your Workspace
                </link_1.default>
              </button_1.Button>)}
          </div>
        </div>
        <div className="absolute -right-[600px] -top-[100px] hidden aspect-square h-[1360px] lg:block">
          <home_svg_1.default />
        </div>
      </container_1.default>
    </main>);
}
exports.default = Home;
