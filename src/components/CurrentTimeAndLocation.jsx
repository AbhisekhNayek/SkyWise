import React from "react";

const CurrentTimeAndLocation = ({
  weather: { formattedLocalTime, name, country },
}) => {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-xl font-extralight">{formattedLocalTime}</p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-3xl font-semibold">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
};

export default CurrentTimeAndLocation;
