"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const mission_1 = require("@/data/mission");
const jotai_1 = require("jotai");
function Mission() {
    const [mission] = (0, jotai_1.useAtom)(mission_1.mission);
    return mission.map((item, index) => (<div className="flex gap-4" key={`mission ${index}`}>
      <div className="text-xl font-bold text-primary">{index + 1}</div>
      <p className="text-gray-600 dark:text-gray-400">
        <span className="font-bold text-foreground">{item.headline}</span>{" "}
        {item.text}
      </p>
    </div>));
}
exports.default = Mission;
