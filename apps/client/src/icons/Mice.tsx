import * as React from "react";
type Props = { disable: boolean };

const MiceIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon"
    style={{
      width: "1em",
      height: "1em",
      verticalAlign: "middle",
      fill: "currentColor",
      overflow: "hidden",
    }}
    viewBox="0 0 1124 1124"
    {...props}
  >
    <path fill="transparent" d="M0 0h1024v1024H0z" />
    <path
      fill="#000"
      d="M864 416a32 32 0 1 0-64 0h64zm-640 0a32 32 0 1 0-64 0h64zm320 416a32 32 0 1 0-64 0h64zm96 128a32 32 0 1 0 0-64v64zm-256-64a32 32 0 1 0 0 64v-64zm288-608v192h64V288h-64zM352 480V288h-64v192h64zm160 160a160 160 0 0 1-160-160h-64a224 224 0 0 0 224 224v-64zm160-160a160 160 0 0 1-160 160v64a224 224 0 0 0 224-224h-64zM512 128a160 160 0 0 1 160 160h64A224 224 0 0 0 512 64v64zm0-64a224 224 0 0 0-224 224h64a160 160 0 0 1 160-160V64zm288 352v64h64v-64h-64zm-576 64v-64h-64v64h64zm288 288a288 288 0 0 1-288-288h-64c0 194.4 157.6 352 352 352v-64zm288-288a288 288 0 0 1-288 288v64c194.4 0 352-157.6 352-352h-64zM480 832v96h64v-96h-64zm32 128h128v-64H512v64zm0-64H384v64h128v-64z"
    />
    {props.disable && (
      <line x1="0" y1="0" x2="1124" y2="1124" stroke="red" strokeWidth="100" />
    )}
  </svg>
);
export default MiceIcon;
