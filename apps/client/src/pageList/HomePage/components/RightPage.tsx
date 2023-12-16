import React from "react";

type Props = {};

function RightPage({}: Props) {
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col justify-around items-center">
        <img src="duo_home1.jpg" className="w-full" />
        <div className="font-montserrat text-slate-gray text-base leading-8 sm:max-w-sm">
          Just Meet It!
        </div>
      </div>
    </div>
  );
}

export default RightPage;
