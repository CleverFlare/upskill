"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const button_1 = require("@/components/ui/button");
const hi2_1 = require("react-icons/hi2");
function Prerequisites({ control, name, }) {
    const { field: { value: untypedValue, onChange }, } = (0, react_hook_form_1.useController)({
        control,
        name,
    });
    const value = untypedValue;
    function handleSetPrerequisite(index, newValue) {
        const before = value.slice(0, index);
        const after = value.slice(index + 1);
        onChange([...before, newValue, ...after]);
    }
    function handleDeletePrerequisite(index) {
        const before = value.slice(0, index);
        const after = value.slice(index + 1);
        onChange([...before, ...after]);
    }
    return (<div className="flex flex-col gap-4">
      <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
        prerequisites
      </p>
      <div className="flex flex-col gap-[10px]">
        {(value !== null && value !== void 0 ? value : []).map((prerequisite, index) => (<div className="flex gap-2" key={`prerequisites ${index}`}>
            <p className="h-full w-5 text-xl font-bold text-primary">
              {index + 1}
            </p>
            <input type="text" className="w-full bg-transparent text-gray-500 dark:text-gray-300" value={prerequisite} placeholder="prerequisite..." onChange={(e) => handleSetPrerequisite(index, e.target.value)}/>
            <button_1.Button variant="ghost" className="text-destructive hover:text-destructive" size="icon" onClick={() => handleDeletePrerequisite(index)} type="button">
              <hi2_1.HiTrash />
            </button_1.Button>
          </div>))}
        <button_1.Button variant="ghost" className="border-2 border-dashed border-primary hover:bg-primary/5" onClick={() => onChange([...value, ""])} type="button">
          <hi2_1.HiPlus className="text-primary"/>
        </button_1.Button>
      </div>
    </div>);
}
exports.default = Prerequisites;
