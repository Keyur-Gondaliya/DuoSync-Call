import * as React from "react";
type Props = { disable: boolean };

const VideoIcon = (props: Props) => (
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
    version="1.1"
  >
    {props.disable && (
      <line x1="0" y1="0" x2="1124" y2="1124" stroke="red" strokeWidth="100" />
    )}

    <path d="M628.9408 209.8176c14.6432 0 28.16 3.6864 40.3456 10.9568 12.288 7.3728 22.016 17.2032 29.3888 29.3888C705.9456 262.4512 709.632 275.8656 709.632 290.6112l0 459.8784c0 22.8352-7.7824 42.8032-23.2448 59.904C670.9248 827.4944 651.776 835.9936 628.9408 835.9936L88.064 835.9936c-22.8352 0-43.2128-8.4992-61.2352-25.7024C8.9088 793.2928 0 773.2224 0 750.4896L0 290.6112c0-22.8352 8.4992-41.984 25.7024-57.4464 17.1008-15.5648 37.9904-23.2448 62.464-23.2448L628.9408 209.92zM670.4128 752.3328 670.4128 288.6656c0-11.4688-3.6864-20.992-11.0592-28.3648C651.8784 252.928 641.6384 249.1392 628.5312 249.1392l-544.768 0c-11.4688 0-21.8112 3.6864-30.8224 11.0592C43.8272 267.6736 39.3216 277.0944 39.3216 288.6656l0 463.6672c0 11.4688 4.9152 21.8112 14.7456 30.8224 9.8304 9.0112 20.5824 13.5168 32.0512 13.5168l544.768 0c11.4688 0 20.8896-4.5056 28.3648-13.5168C666.624 774.144 670.4128 763.904 670.4128 752.3328zM785.8176 416.1536 1024 286.0032l0 471.4496L785.8176 627.3024 785.8176 416.1536zM984.6784 359.6288 825.1392 440.7296l0 162.0992 159.6416 80.9984L984.7808 359.6288z" />
  </svg>
);
export default VideoIcon;