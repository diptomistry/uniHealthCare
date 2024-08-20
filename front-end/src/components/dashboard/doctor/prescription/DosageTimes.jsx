// DosageTimes.js
import React from "react";
import IncrementDecrementBtn from "./IncrementDecrementBtn";

const DosageTimes = ({ handleCountValues }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-2 bg-backgroundColor/10 border-[1px] border-backgroundColor">
      <div className="flex flex-col justify-center items-center">
        <h1>Morning</h1>
        <IncrementDecrementBtn
          index={0}
          onCountChange={(count) => handleCountValues(0, count)}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1>Noon</h1>
        <IncrementDecrementBtn
          index={1}
          onCountChange={(count) => handleCountValues(1, count)}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1>Night</h1>
        <IncrementDecrementBtn
          index={2}
          onCountChange={(count) => handleCountValues(2, count)}
        />
      </div>
    </div>
  );
};

export default DosageTimes;
