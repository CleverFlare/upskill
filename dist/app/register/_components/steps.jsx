"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const step_one_1 = __importDefault(require("./step-one"));
const step_two_1 = __importDefault(require("./step-two"));
const step_three_1 = __importDefault(require("./step-three"));
const step_four_1 = __importDefault(require("./step-four"));
exports.default = [
    {
        title: "Registration Role",
        description: "Who are you registering as?",
        step: (control) => <step_one_1.default control={control}/>,
        error: (errors) => !!(errors === null || errors === void 0 ? void 0 : errors.role),
    },
    {
        title: "Registrant Name",
        description: "What is your name?",
        step: (control) => <step_two_1.default control={control}/>,
        error: (errors) => { var _a; return (_a = !!(errors === null || errors === void 0 ? void 0 : errors.firstName)) !== null && _a !== void 0 ? _a : !!(errors === null || errors === void 0 ? void 0 : errors.lastName); },
    },
    {
        title: "Registrant Personal Data",
        description: "Almost there, we just need some personal information.",
        step: (control) => <step_three_1.default control={control}/>,
        error: (errors) => {
            var _a, _b, _c;
            return (_c = (_b = (_a = !!(errors === null || errors === void 0 ? void 0 : errors.email)) !== null && _a !== void 0 ? _a : !!(errors === null || errors === void 0 ? void 0 : errors.phone)) !== null && _b !== void 0 ? _b : !!(errors === null || errors === void 0 ? void 0 : errors.gender)) !== null && _c !== void 0 ? _c : !!(errors === null || errors === void 0 ? void 0 : errors.birthDay);
        },
    },
    {
        title: "Personal Identity Data",
        description: "Last step, just fill in your desired username & password",
        step: (control) => <step_four_1.default control={control}/>,
        error: (errors) => { var _a; return (_a = !!(errors === null || errors === void 0 ? void 0 : errors.username)) !== null && _a !== void 0 ? _a : !!(errors === null || errors === void 0 ? void 0 : errors.password); },
    },
];
