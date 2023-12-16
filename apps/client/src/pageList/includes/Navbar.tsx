"use client";
import React, { useState, useEffect } from "react";

import CallIcon from "@/icons/Call";
import InfoIcon from "@/icons/Info";
import LinkedInIcon from "@/icons/LinkedIn";
import XIcon from "@/icons/X";
import GithubIcon from "@/icons/Github";

type Props = {};

function Navbar({}: Props) {
  return (
    <div className="flex justify-between px-2 mx-1 my-3 text-xs text-zinc-700">
      <div className="tracking-[.5em]">
        <div className="flex text-coral-blue text-xl">
          <CallIcon />
          Duo
          <div className="text-white p-0 pb-1 bg-secoundary inline mr-1 text-center">
            S
          </div>
          ync
        </div>
      </div>
      <div className="flex gap-2">
        <Clock />
        <div
          className="cursor-pointer"
          id="dropdownUserAvatarButton"
          data-dropdown-toggle="dropdownAvatar"
        >
          <InfoIcon />
        </div>

        <div
          id="dropdownAvatar"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3  text-gray-900 dark:text-white flex justify-evenly">
            <a
              href="https://www.linkedin.com/in/keyur-gondaliya/"
              target="_blank"
              className="cursor-pointer"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://twitter.com/Keyur403"
              target="_blank"
              className="cursor-pointer"
            >
              <XIcon />
            </a>
            <a
              href="https://github.com/Keyur-Gondaliya"
              target="_blank"
              className="cursor-pointer"
            >
              <GithubIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
function Clock() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDateMonth = time.toLocaleDateString(undefined, {
    month: "short",
  });
  const formattedDateDay = time.toLocaleDateString(undefined, {
    day: "numeric",
  });
  const formattedDateWeekDay = time.toLocaleDateString(undefined, {
    weekday: "short",
  });

  return (
    <div>
      {formattedTime.toUpperCase()} • {formattedDateWeekDay},{" "}
      {formattedDateMonth} {formattedDateDay}
    </div>
  );
}
