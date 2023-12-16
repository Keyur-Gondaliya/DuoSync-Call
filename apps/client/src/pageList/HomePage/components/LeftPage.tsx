import React from "react";

type Props = {
  createMeeting: () => void;
};

function LeftPage({ createMeeting }: Props) {
  return (
    <div className="flex justify-center items-end h-full">
      <div>
        <h1 className="mt-10 font-palanquin text-5xl max-sm:text-[72px] max-sm:leading-[82px] font-bold">
          <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">
            Welcome to the
          </span>
          <br />
          <span className="text-secoundary inline-block mt-3">
            DuoSync
          </span>{" "}
          Call
        </h1>
        <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-4 sm:max-w-sm">
          Do Easy and Fast One-to-One Calling
        </p>
        <button
          type="button"
          onClick={createMeeting}
          className="text-white bg-coral-blue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-xs px-4 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default LeftPage;
