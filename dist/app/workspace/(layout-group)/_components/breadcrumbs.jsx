"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const breadcrumb_1 = require("@/components/ui/breadcrumb");
const link_1 = __importDefault(require("next/link"));
function Breadcrumbs({ items, ...rest }) {
    return (<breadcrumb_1.Breadcrumb {...rest}>
      <breadcrumb_1.BreadcrumbList>
        {items.map((item, index) => (<>
            {index > 0 && <breadcrumb_1.BreadcrumbSeparator />}
            <breadcrumb_1.BreadcrumbItem className="text-base">
              {!(item === null || item === void 0 ? void 0 : item.href) && item}
              {!!(item === null || item === void 0 ? void 0 : item.href) && (<breadcrumb_1.BreadcrumbLink asChild>
                  <link_1.default href={item.href}>
                    {item.name}
                  </link_1.default>
                </breadcrumb_1.BreadcrumbLink>)}
            </breadcrumb_1.BreadcrumbItem>
          </>))}
      </breadcrumb_1.BreadcrumbList>
    </breadcrumb_1.Breadcrumb>);
}
exports.default = Breadcrumbs;
