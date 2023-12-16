import * as React from "react";
type Props = {};

const XIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={16}
    viewBox="0 0 448 512"
    {...props}
  >
    <path d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396h-95.6L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5 78.2-89.5h47.5zm-37.8 251.6L153.4 142.9h-28.3l171.8 224.7h26.3z" />
  </svg>
);
export default XIcon;
