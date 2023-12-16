import React from "react";
import LeftPage from "./components/LeftPage";
import RightPage from "./components/RightPage";

type Props = {
  createMeeting: () => void;
};

function HomePage({ createMeeting }: Props) {
  return (
    <div className="grid grid-flow-col grid-cols-12">
      <div className="col-span-6">
        <LeftPage createMeeting={createMeeting} />
      </div>
      <div className="col-span-6">
        <RightPage />
      </div>
    </div>
  );
}

export default HomePage;
