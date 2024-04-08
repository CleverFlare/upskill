"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
function filterChange(defaultValues, currentValues) {
    const result = {};
    for (const [key, value] of Object.entries(defaultValues)) {
        if (!currentValues.hasOwnProperty(key))
            continue;
        if (!lodash_1.default.isEqual(value, currentValues[key]))
            result[key] = currentValues[key];
    }
    return result;
}
exports.default = filterChange;
