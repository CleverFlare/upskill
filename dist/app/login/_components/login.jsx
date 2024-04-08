"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const login_1 = __importDefault(require("@/schema/login"));
const zod_1 = require("@hookform/resolvers/zod");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const react_hook_form_1 = require("react-hook-form");
const react_1 = require("next-auth/react");
const hi2_1 = require("react-icons/hi2");
const react_2 = require("react");
const lu_1 = require("react-icons/lu");
const sonner_1 = require("sonner");
const field_1 = __importDefault(require("@/components/input/field"));
function Login() {
    const { control, handleSubmit } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(login_1.default),
    });
    const [isLoading, setIsLoading] = (0, react_2.useState)(false);
    const router = (0, navigation_1.useRouter)();
    async function submitData(data) {
        try {
            setIsLoading(true);
            const res = await (0, react_1.signIn)("credentials", {
                username: data.username,
                password: data.password,
                redirect: false,
            });
            setIsLoading(false);
            if (!(res === null || res === void 0 ? void 0 : res.ok))
                sonner_1.toast.error(<div className="flex gap-2">
            <hi2_1.HiExclamationCircle className="text-2xl text-destructive"/>
            <p className="font-bold text-destructive">{res === null || res === void 0 ? void 0 : res.error}</p>
          </div>);
            else {
                router.push("/");
                router.refresh();
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (<form onSubmit={handleSubmit(submitData)} className="flex flex-col gap-[inherit]">
      <field_1.default control={control} name="username" label="Username" placeholder="username..." required/>
      <field_1.default control={control} name="password" label="Password" placeholder="password..." type="password" required/>
      <link_1.default href="/" className="text-sm text-primary hover:underline">
        Not ready to login? Go home.
      </link_1.default>
      <button_1.Button className="flex gap-2" disabled={isLoading}>
        {!isLoading && <hi2_1.HiArrowLeftOnRectangle className="text-base"/>}
        {isLoading && <lu_1.LuLoader2 className="animate-spin"/>}
        Login
      </button_1.Button>
      <button_1.Button variant="outline" className="flex gap-2" asChild>
        <link_1.default href="/register">
          <hi2_1.HiOutlineUser className="text-base"/>
          Register
        </link_1.default>
      </button_1.Button>
    </form>);
}
exports.default = Login;
