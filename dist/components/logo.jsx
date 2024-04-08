"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function SVG() {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="31" fill="none" viewBox="0 0 26 31">
      <g fill="currentcolor" clipPath="url(#clip0_1034_224)">
        <path d="M8.242 15.5L7.01 17.638 5.95 19.466l-1.23 2.138H1.53a.805.805 0 01-.7-1.208l1.594-2.759v-.004L3.66 15.5l2.291-3.967L8.242 15.5z"></path>
        <path d="M16.528 17.638l2.287 3.966-1.232 2.135-1.055 1.832-1.233 2.135v.003l-1.594 2.76a.806.806 0 01-1.394 0l-1.598-2.763-1.237-2.135-1.055-1.832-1.232-2.135 2.287-3.966h.004l2.288 3.966L13 23.74l1.228-2.135h.004L13 19.47v-.004l-1.06-1.828-1.23-2.138-1.238-2.135v-.004l-1.053-1.828-1.232-2.138 2.285-3.968 1.233-2.134V3.29L12.298.531a.805.805 0 011.395 0l1.597 2.758h.003v.004l1.235 2.134 2.287 3.968-1.232 2.138-1.055 1.828-1.061-1.828-1.233-2.138h-.004L13 7.26l-1.23 2.135L13 11.533l2.29 3.967 1.238 2.134v.004z"></path>
        <path d="M24.469 21.604H21.28l-1.232-2.139-1.057-1.828-1.233-2.137 2.292-3.967 2.29 3.967 1.233 2.134v.004l1.595 2.758a.805.805 0 01-.7 1.208z"></path>
      </g>
      <defs>
        <clipPath id="clip0_1034_224">
          <path fill="#fff" d="M0 0H26V31H0z"></path>
        </clipPath>
      </defs>
    </svg>);
}
function Logo({ compact }) {
    return (<div className="flex items-center gap-2 text-primary">
      <SVG />
      {!compact && <p className="text-2xl font-bold">Upskill</p>}
    </div>);
}
exports.default = Logo;
