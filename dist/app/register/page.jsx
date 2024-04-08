"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = __importDefault(require("@/components/container"));
const step_1 = __importDefault(require("@/components/step"));
const step_line_1 = __importDefault(require("./_components/step-line"));
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const register_1 = __importDefault(require("@/schema/register"));
const react_1 = require("react");
const steps_1 = __importDefault(require("./_components/steps"));
const button_1 = require("@/components/ui/button");
const link_1 = __importDefault(require("next/link"));
const react_2 = require("@/trpc/react");
const lu_1 = require("react-icons/lu");
const react_3 = require("next-auth/react");
const sonner_1 = require("sonner");
const hi2_1 = require("react-icons/hi2");
const navigation_1 = require("next/navigation");
function Page() {
    const [stepNumber, setStepNumber] = (0, react_1.useState)(0);
    const formRef = (0, react_1.useRef)();
    const { control, handleSubmit, formState: { errors }, getValues, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(register_1.default),
    });
    if (stepNumber > steps_1.default.length - 1)
        setStepNumber(steps_1.default.length - 1);
    else if (stepNumber < 0)
        setStepNumber(0);
    const lastStep = stepNumber >= steps_1.default.length - 1;
    const firstStep = stepNumber <= 0;
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const router = (0, navigation_1.useRouter)();
    const { mutate } = react_2.api.auth.register.useMutation({
        onSuccess: async () => {
            try {
                const values = getValues();
                const res = await (0, react_3.signIn)("credentials", {
                    username: values.username,
                    password: values.password,
                    redirect: false,
                });
                setIsLoading(false);
                if (!(res === null || res === void 0 ? void 0 : res.ok))
                    (0, sonner_1.toast)(<div className="flex gap-2">
              <hi2_1.HiExclamationTriangle className="text-2xl text-destructive"/>
              <p className="text-destructive">Something Went Wrong!</p>
            </div>);
                else {
                    router.refresh();
                    if (values.role === "instructor")
                        router.push("/submit-success");
                    else
                        router.push("/");
                }
            }
            catch (err) {
                console.log(err);
            }
        },
    });
    function submitData(data) {
        setIsLoading(true);
        mutate(data);
    }
    return (<container_1.default className="flex h-screen flex-col items-center justify-center">
      <form className="flex w-full max-w-[400px] flex-col gap-4" onSubmit={handleSubmit(submitData)} ref={formRef}>
        <div className="flex w-full items-center">
          {steps_1.default.map(({ error }, index) => {
            const state = stepNumber === index
                ? "selected"
                : stepNumber > index
                    ? "checked"
                    : null;
            const lineCheck = stepNumber >= index + 1 ? true : false;
            const stepComp = (<step_1.default state={state} isError={error(errors)} onClick={() => setStepNumber(index)}/>);
            if (index === steps_1.default.length - 1)
                return stepComp;
            return (<>
                {stepComp}
                <step_line_1.default checked={lineCheck} isError={error(errors)}/>
              </>);
        })}
        </div>
        <p className="text-3xl font-bold">{steps_1.default[stepNumber].title}</p>
        <p className="text-gray-500">{steps_1.default[stepNumber].description}</p>
        {steps_1.default[stepNumber].step(control)}
        <link_1.default href="/login" className="text-sm text-primary hover:underline">
          Already have an accouent? Go to login.
        </link_1.default>
        <div className="flex flex-wrap gap-3">
          <button_1.Button type="button" variant="outline" disabled={stepNumber <= 0} onClick={() => setStepNumber((num) => (firstStep ? num : --num))}>
            Previous
          </button_1.Button>
          <button_1.Button type="button" disabled={isLoading} onClick={() => {
            var _a;
            setStepNumber((num) => (lastStep ? num : ++num));
            if (lastStep)
                (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.requestSubmit();
        }}>
            {isLoading && <lu_1.LuLoader2 className="me-2 animate-spin"/>}
            {stepNumber >= steps_1.default.length - 1 ? "Submit" : "Next"}
          </button_1.Button>
        </div>
      </form>
    </container_1.default>);
}
exports.default = Page;
