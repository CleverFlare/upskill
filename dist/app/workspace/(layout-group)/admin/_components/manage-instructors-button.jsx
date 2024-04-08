"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const avatar_1 = require("@/components/ui/avatar");
const button_1 = require("@/components/ui/button");
const dialog_1 = require("@/components/ui/dialog");
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const utils_1 = require("@/lib/utils");
const react_1 = require("@/trpc/react");
const react_2 = require("react");
const hi2_1 = require("react-icons/hi2");
const lu_1 = require("react-icons/lu");
function SelectRole({ name, username, image, role, onRoleChange, }) {
    return (<div className="flex items-center gap-2">
      <avatar_1.Avatar>
        <avatar_1.AvatarImage src={image} className="object-cover"/>
        <avatar_1.AvatarFallback>AV</avatar_1.AvatarFallback>
      </avatar_1.Avatar>
      <div className="flex flex-col">
        <p>{name}</p>
        <p className="text-sm text-gray-500">{username}</p>
      </div>
      <div className="flex flex-1 justify-end">
        <select_1.Select value={role} onValueChange={onRoleChange}>
          <select_1.SelectTrigger className={(0, utils_1.cn)("max-w-[150px]", !role ? "text-muted-foreground" : "")}>
            <select_1.SelectValue placeholder="Role"/>
          </select_1.SelectTrigger>
          <select_1.SelectContent>
            <select_1.SelectItem value="none">None</select_1.SelectItem>
            <select_1.SelectItem value="instructor">Instructor</select_1.SelectItem>
            <select_1.SelectItem value="head">Head</select_1.SelectItem>
          </select_1.SelectContent>
        </select_1.Select>
      </div>
    </div>);
}
function ManageInstructorsButton({ value, onChange, }) {
    const [search, setSearch] = (0, react_2.useState)("");
    const [roles, setRoles] = (0, react_2.useState)({});
    const [instructors, setInstructors] = (0, react_2.useState)([]);
    const [open, setOpen] = (0, react_2.useState)(false);
    function setReceivedInstructor() {
        const instructorsWithoutRoles = value.map(({ role: _, ...rest }) => ({
            ...rest,
        }));
        setInstructors(instructorsWithoutRoles);
    }
    const { mutateAsync, isPending, data, reset } = react_1.api.user.getInstructors.useMutation();
    (0, react_2.useEffect)(() => {
        if (!open)
            return;
        reset();
        setSearch("");
        setReceivedInstructor();
        const modifiedRoles = {};
        value.map(({ id, role }) => {
            modifiedRoles[id] = role;
        });
        setRoles(modifiedRoles);
    }, [open]);
    function handleRoleChange(id, role) {
        const isNone = role === "none";
        setRoles((prevRoles) => ({ ...prevRoles, [id]: isNone ? "" : role }));
        if (isNone)
            setInstructors((prevInstructors) => prevInstructors.filter((instructor) => instructor.id !== id));
        else if (!instructors.filter((instructor) => instructor.id === id).length)
            setInstructors((prevInstructors) => {
                const instructor = data === null || data === void 0 ? void 0 : data.find((instructor) => instructor.id === id);
                if (!instructor)
                    return prevInstructors;
                return [
                    ...prevInstructors,
                    {
                        name: `${instructor.firstName} ${instructor.lastName}`,
                        username: instructor.username,
                        image: instructor.image,
                        id: instructor.id,
                    },
                ];
            });
        console.log(roles);
        console.log(instructors);
    }
    function handleSave() {
        const fullInstructorValues = instructors
            .map((instructor) => ({
            ...instructor,
            role: roles[instructor.id],
        }))
            .filter((instructor) => !!instructor.role);
        onChange(fullInstructorValues);
    }
    async function handleSubmitSearch(e) {
        e.stopPropagation();
        e.preventDefault();
        if (!search) {
            reset();
            return;
        }
        const queriedInstructors = await mutateAsync(search);
        const modifiedInstructors = queriedInstructors.map((instructor) => {
            var _a;
            return ({
                name: `${instructor.firstName} ${instructor.lastName}`,
                username: instructor.username,
                id: instructor.id,
                image: (_a = instructor.image) !== null && _a !== void 0 ? _a : undefined,
            });
        });
        setInstructors(modifiedInstructors);
    }
    return (<dialog_1.Dialog open={open} onOpenChange={setOpen}>
      <dialog_1.DialogTrigger asChild>
        <button_1.Button>
          <hi2_1.HiOutlineCog6Tooth className="me-2 text-base"/>
          Manage
        </button_1.Button>
      </dialog_1.DialogTrigger>
      <dialog_1.DialogContent>
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle>This is the dialog</dialog_1.DialogTitle>
          <dialog_1.DialogDescription>Manage course instructors here.</dialog_1.DialogDescription>
        </dialog_1.DialogHeader>
        <div className="flex flex-col gap-6 overflow-x-visible">
          <form className="flex w-full rounded-md focus-within:ring-2 focus-within:ring-primary" onSubmit={handleSubmitSearch}>
            <input_1.Input type="search" placeholder="Search..." className="rounded-ee-none rounded-se-none focus-visible:outline-none focus-visible:ring-0" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <button_1.Button variant="outline" size="icon" className="rounded-es-none rounded-ss-none">
              <hi2_1.HiMagnifyingGlass className="text-lg"/>
            </button_1.Button>
          </form>
          <div className="flex max-h-[200px] flex-col gap-[inherit] overflow-y-auto">
            {isPending && <lu_1.LuLoader2 className="animate-spin text-2xl"/>}
            {!isPending && !instructors.length && (<p className="text-xl font-bold">No Users Found</p>)}
            {!isPending &&
            !!data &&
            data.map((instructor) => {
                var _a, _b;
                return (<SelectRole name={`${instructor.firstName} ${instructor.lastName}`} username={instructor.username} image={(_a = instructor.image) !== null && _a !== void 0 ? _a : undefined} role={(_b = roles === null || roles === void 0 ? void 0 : roles[instructor.id]) !== null && _b !== void 0 ? _b : ""} onRoleChange={(value) => handleRoleChange(instructor.id, value)}/>);
            })}
            {!isPending &&
            !data &&
            !!instructors.length &&
            instructors.map((instructor) => {
                var _a;
                return (<SelectRole name={instructor.name} username={instructor.username} image={instructor.image} role={(_a = roles === null || roles === void 0 ? void 0 : roles[instructor.id]) !== null && _a !== void 0 ? _a : ""} onRoleChange={(value) => handleRoleChange(instructor.id, value)}/>);
            })}
          </div>
        </div>
        <dialog_1.DialogFooter>
          <dialog_1.DialogClose asChild>
            <button_1.Button variant="outline">Cancel</button_1.Button>
          </dialog_1.DialogClose>
          <dialog_1.DialogClose asChild>
            <button_1.Button onClick={() => handleSave()}>Save</button_1.Button>
          </dialog_1.DialogClose>
        </dialog_1.DialogFooter>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
}
exports.default = ManageInstructorsButton;
