"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { thermometer } from "@/app/utils/icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function FeelsLike() {
  const { forecast } = useGlobalContext();

  if (!forecast?.main?.feels_like) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { feels_like, temp_min, temp_max } = forecast.main;

  // Calculate a description for how it feels
  const feelsLikeText = (feelsLike, minTemp, maxTemp) => {
    const avgTemp = (minTemp + maxTemp) / 2;
    const diff = feelsLike - avgTemp;

    if (diff < -5) return "Feels significantly colder than actual temperature.";
    if (diff >= -5 && diff <= 5) return "Feels close to the actual temperature.";
    return "Feels significantly warmer than actual temperature.";
  };

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-4 dark:bg-dark-grey shadow-sm dark:shadow-none overflow-hidden">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {thermometer} Feels Like
        </h2>
        <p className="pt-4 text-2xl">{kelvinToCelsius(feels_like)}°C</p>
      </div>

      <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
        {feelsLikeDescription}
      </p>
    </div>
  );
}

export default FeelsLike;
