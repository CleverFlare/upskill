"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const about_us_svg_1 = __importDefault(require("@/components/about-us-svg"));
const container_1 = __importDefault(require("@/components/container"));
const image_1 = __importDefault(require("next/image"));
const values_1 = __importDefault(require("@/app/_components/values"));
const mission_1 = __importDefault(require("@/app/_components/mission"));
function Page() {
    return (<container_1.default className="flex flex-col gap-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold text-primary">Our Story</p>
          <h2 className="text-4xl font-bold">
            Your Journey to Unlocking Potential
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            At Upskill, we believe transformation, not just training, unlocks
            your potential. The world is racing ahead, leaving traditional
            education behind. We saw a need for adaptable, engaging learning
            that empowers you to thrive in this new landscape.
            <br />
            <br /> That's why we built Upskill. We're passionate educators,
            entrepreneurs, and lifelong learners, and our courses are just the
            beginning. Join our vibrant community, connect with like-minded
            individuals, and together, let's unlock your greatness.
          </p>
        </div>
        <div>
          <about_us_svg_1.default />
        </div>
      </div>
      <image_1.default src="/fraternity.webp" alt="Fraternity" width={1080} height={374} className="h-[374px] w-full rounded-lg object-cover object-center"/>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-4xl font-bold">Our Values</h3>
          <p className="text-gray-600 dark:text-gray-400">
            We believe in empowering individuals to unlock their full potential
            through transformative learning experiences, not just rote
            memorization
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <values_1.default />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-4xl font-bold">Our Mission</h3>
          <div className="text-gray-600 dark:text-gray-400">
            <p>Unleashing Potential, One Learner at a Time.</p>
            <br />
            <br />
            <span className="font-bold">
              Our mission is to ignite a global revolution of learning, where
              anyone, anywhere, can unlock their full potential.
            </span>{" "}
            <p>
              We believe that education should be a transformative journey, not
              a rigid path. It should empower, not limit. It should spark
              curiosity, not stifle creativity.
            </p>
            <br />
            <br />
            <span className="font-bold">
              That's why we're building Upskill:
            </span>{" "}
            <p>
              a vibrant community where passion fuels knowledge, and innovation
              drives progress. We're not just offering courses; we're creating a
              space for exploration, collaboration, and continuous growth.
            </p>
          </div>
        </div>
        <div className="grid gap-8">
          <mission_1.default />
        </div>
      </div>
    </container_1.default>);
}
exports.default = Page;
