import React from "react";

const WeatherForecast = ({ title, data }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-lg p-4 m-5">
      {/* Title */}
      <div className="flex items-center justify-start">
        <p className="font-medium uppercase text-white">{title}</p>
      </div>
      <hr className="my-1 border-gray-400" />

      {/* Weather Details in a horizontal layout */}
      <div className="flex justify-around items-center text-center py-3">
        {data.map((d, index) => (          
          <div key={index} className="flex flex-col items-center justify-center">
            <p className="font-light text-sm text-gray-300">{d.title}</p>
            <img src={d.icon} alt="weather icon" className="w-12 my-1" />
            <p className="font-medium text-white">{`${d.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
