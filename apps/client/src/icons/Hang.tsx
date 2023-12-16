import * as React from "react";
type Props = {};

const HangUpIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon"
    style={{
      height: "1rem",
      width: "1rem",
      verticalAlign: "middle",
      fill: "currentColor",
      overflow: "hidden",
    }}
    viewBox="-100 0 1124 1124"
    {...props}
  >
    <path
      fill="white"
      d="M57.856 600.107a52.395 52.395 0 0 1 0-73.814c245.675-246.613 645.035-246.613 891.648 0 20.267 20.395 20.267 53.334 0 73.771l-89.515 89.557a51.84 51.84 0 0 1-73.301.427 411.563 411.563 0 0 0-101.973-74.24 51.584 51.584 0 0 1-28.374-46.464l-.512-100.693c-99.413-29.782-205.354-29.867-304.81-.171v100.139a52.858 52.858 0 0 1-28.587 46.634 394.155 394.155 0 0 0-101.59 74.07c-20.48 20.224-53.375 20.224-73.813-.043l-89.173-89.173z"
    />
  </svg>
);
export default HangUpIcon;
