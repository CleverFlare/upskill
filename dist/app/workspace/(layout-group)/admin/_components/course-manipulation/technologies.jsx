"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_technology_1 = __importDefault(require("@/schema/create-technology"));
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const create_tech_fields_1 = require("./create-tech-fields");
const dialog_1 = require("@/components/ui/dialog");
const hi2_1 = require("react-icons/hi2");
const button_1 = require("@/components/ui/button");
const tech_card_1 = __importDefault(require("@/components/tech-card"));
const react_1 = require("react");
function Technologies({ control: externalControl, name: externalName, }) {
    var _a;
    const { control, handleSubmit, setError, formState: { errors }, reset, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(create_technology_1.default),
    });
    const [openDialog, setOpenDialog] = (0, react_1.useState)(false);
    const { field: { value: unknownValue, onChange }, fieldState: { error }, } = (0, react_hook_form_1.useController)({
        control: externalControl,
        name: externalName,
    });
    const value = unknownValue;
    function submitData(data) {
        onChange({ ...value, [crypto.randomUUID()]: data });
        setOpenDialog(false);
        reset();
    }
    function handleDeleteTechnology(id) {
        onChange(() => {
            delete value[id];
            return { ...value };
        });
    }
    function handleOpenChange(open) {
        if (open)
            return;
        reset();
        setOpenDialog(false);
    }
    return (<div className="flex flex-col gap-4">
      <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
        technologies
      </p>
      <div className="flex flex-col gap-2">
        <div className="box-content flex w-full snap-x snap-mandatory flex-wrap gap-4 overflow-x-auto pb-2 md:overflow-x-visible">
          {(_a = Object === null || Object === void 0 ? void 0 : Object.entries(value !== null && value !== void 0 ? value : {})) === null || _a === void 0 ? void 0 : _a.map(([id, { name, logo }]) => (<tech_card_1.default key={id} logoUrl={typeof logo === "string" ? logo : URL.createObjectURL(logo)} name={name} onDelete={() => handleDeleteTechnology(id)}/>))}
          <dialog_1.Dialog onOpenChange={handleOpenChange} open={openDialog}>
            <dialog_1.DialogTrigger asChild>
              <button_1.Button variant="ghost" className="h-screen max-h-24 w-full max-w-24  border-2 border-dashed border-primary hover:bg-primary/5" type="button" onClick={() => setOpenDialog(true)}>
                <hi2_1.HiPlus className="text-primary"/>
              </button_1.Button>
            </dialog_1.DialogTrigger>
            <dialog_1.DialogContent>
              <form onSubmit={(e) => {
            e.stopPropagation();
            return handleSubmit(submitData)(e);
        }}>
                <dialog_1.DialogHeader>
                  <dialog_1.DialogTitle>Add a Technology</dialog_1.DialogTitle>
                  <dialog_1.DialogDescription>
                    This will create a new technology.
                  </dialog_1.DialogDescription>
                </dialog_1.DialogHeader>
                <div className="grid gap-4 py-4">
                  <create_tech_fields_1.NameField control={control} name="name"/>
                  <create_tech_fields_1.LogoField control={control} name="logo" onError={(message) => setError("logo", { type: "custom", message })}/>
                </div>
                <dialog_1.DialogFooter>
                  <button_1.Button type="submit">Save changes</button_1.Button>
                </dialog_1.DialogFooter>
              </form>
            </dialog_1.DialogContent>
          </dialog_1.Dialog>
        </div>
        {!!error && <p className="text-sm text-destructive">{error.message}</p>}
      </div>
    </div>);
}
exports.default = Technologies;
