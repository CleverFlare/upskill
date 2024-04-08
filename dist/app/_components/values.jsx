"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const values_1 = require("@/data/values");
const jotai_1 = require("jotai");
function Values() {
    const [values] = (0, jotai_1.useAtom)(values_1.values);
    return values.map((value) => (<div className="flex gap-4" key={`key ${value.headline}`}>
      <div>
        <value.Icon className="text-xl text-primary"/>
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        <span className="font-bold text-foreground">{value.headline}</span>{" "}
        {value.text}
      </p>
    </div>));
}
exports.default = Values;
