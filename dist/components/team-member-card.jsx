"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const avatar_1 = require("./ui/avatar");
function TeamMemberCard({ image, name, role, ...props }) {
    var _a, _b, _c, _d;
    const splitName = name.split(" ");
    const firstName = splitName[0];
    const lastName = splitName[1];
    return (<div className="flex w-[163px] flex-col items-center gap-2" {...props}>
      <avatar_1.Avatar className="size-[64px]">
        <avatar_1.AvatarImage src={image} className="object-cover"/>
        <avatar_1.AvatarFallback>
          {(_b = (_a = firstName === null || firstName === void 0 ? void 0 : firstName[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : "A"}
          {(_d = (_c = lastName === null || lastName === void 0 ? void 0 : lastName[0]) === null || _c === void 0 ? void 0 : _c.toUpperCase()) !== null && _d !== void 0 ? _d : "V"}
        </avatar_1.AvatarFallback>
      </avatar_1.Avatar>
      <p className="w-full truncate text-center font-bold">{name}</p>
      <p className="rounded-full border border-gray-200 px-[10px] py-[2px] text-xs font-semibold dark:border-gray-700">
        {role}
      </p>
    </div>);
}
exports.default = TeamMemberCard;
