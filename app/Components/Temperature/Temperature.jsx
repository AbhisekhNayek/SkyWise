"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import moment from "moment";

function Temperature() {
  const { forecast } = useGlobalContext();

  // State
  const [localTime, setLocalTime] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [temp, setTemp] = useState(null);
  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);
  const [weatherMain, setWeatherMain] = useState("");
  const [description, setDescription] = useState("");
  const [timezone, setTimezone] = useState(0);
  const [name, setName] = useState("");

  // Effect to set temperature and weather data when forecast changes
  useEffect(() => {
    if (forecast && forecast.weather) {
      const { main, timezone, name, weather } = forecast;
      setTemp(kelvinToCelsius(main.temp));
      setMinTemp(kelvinToCelsius(main.temp_min));
      setMaxTemp(kelvinToCelsius(main.temp_max));
      setWeatherMain(weather[0].main);
      setDescription(weather[0].description);
      setTimezone(timezone);
      setName(name);
    }
  }, [forecast]);

  // Hook to update local time
  useEffect(() => {
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      const formattedTime = localMoment.format("HH:mm:ss");
      const day = localMoment.format("dddd");
      setLocalTime(formattedTime);
      setCurrentDay(day);
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  // Loading state
  if (temp === null) {
    return <div>Loading...</div>; // Show loading while temp is null
  }

  // Function to get weather icon based on the main weather type
  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  return (
    <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none">
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°</p>
      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
