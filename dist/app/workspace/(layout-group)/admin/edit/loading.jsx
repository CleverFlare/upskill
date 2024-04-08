"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skeleton_1 = require("@/components/ui/skeleton");
function Page() {
    return (<div className="flex flex-col gap-10 py-5">
      <div className="flex flex-col gap-10">
        <skeleton_1.Skeleton className="h-[217px] w-full"/>
        <div className="flex flex-col gap-4">
          <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
            track description
          </p>
          <skeleton_1.Skeleton className="h-4 w-[250px]"/>
          <skeleton_1.Skeleton className="h-4 w-[500px]"/>
          <skeleton_1.Skeleton className="h-4 w-[500px]"/>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
            technologies
          </p>
          <div className="box-content flex w-full snap-x snap-mandatory flex-wrap gap-4 overflow-x-auto pb-2 md:overflow-x-visible">
            <skeleton_1.Skeleton className="size-[96px] rounded-xl"/>
            <skeleton_1.Skeleton className="size-[96px] rounded-xl"/>
            <skeleton_1.Skeleton className="size-[96px] rounded-xl"/>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
            team
          </p>
          <div className="box-content flex w-full snap-x snap-mandatory flex-wrap gap-4 overflow-x-auto pb-2 md:overflow-x-visible">
            <div className="flex w-[163px] flex-col items-center gap-2 p-3">
              <skeleton_1.Skeleton className="size-[64px] rounded-full"/>
              <skeleton_1.Skeleton className="h-4 w-full"/>
              <skeleton_1.Skeleton className="h-4 w-[50px] rounded-full"/>
            </div>
            <div className="flex w-[163px] flex-col items-center gap-2 p-3">
              <skeleton_1.Skeleton className="size-[64px] rounded-full"/>
              <skeleton_1.Skeleton className="h-4 w-full"/>
              <skeleton_1.Skeleton className="h-4 w-[50px] rounded-full"/>
            </div>
            <div className="flex w-[163px] flex-col items-center gap-2 p-3">
              <skeleton_1.Skeleton className="size-[64px] rounded-full"/>
              <skeleton_1.Skeleton className="h-4 w-full"/>
              <skeleton_1.Skeleton className="h-4 w-[50px] rounded-full"/>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
            prerequisites
          </p>
          <div className="flex flex-col gap-[10px]">
            <skeleton_1.Skeleton className="h-4 w-[400px]"/>
            <skeleton_1.Skeleton className="h-4 w-[400px]"/>
            <skeleton_1.Skeleton className="h-4 w-[400px]"/>
          </div>
        </div>
      </div>
    </div>);
}
exports.default = Page;
