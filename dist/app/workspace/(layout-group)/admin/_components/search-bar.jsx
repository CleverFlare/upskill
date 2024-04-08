"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const hi2_1 = require("react-icons/hi2");
function SearchBar() {
    const [search, setSearch] = (0, react_1.useState)("");
    const router = (0, navigation_1.useRouter)();
    function handleSubmit(e) {
        e.preventDefault();
        router.push(`?search=${search}`);
    }
    return (<form onSubmit={handleSubmit} className="flex w-full max-w-[400px] rounded-md focus-within:ring-2 focus-within:ring-primary">
      <input_1.Input type="search" placeholder="Search..." className="rounded-ee-none rounded-se-none focus-visible:outline-none focus-visible:ring-0" value={search} onChange={(e) => setSearch(e.target.value)}/>
      <button_1.Button variant="outline" size="icon" className="rounded-es-none rounded-ss-none">
        <hi2_1.HiMagnifyingGlass className="text-lg"/>
      </button_1.Button>
    </form>);
}
exports.default = SearchBar;
