"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { people } from "@/app/utils/icons";
import { formatNumber } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Population() {
  const { fiveDayForecast } = useGlobalContext();
  const { city } = fiveDayForecast;

  // Loading state
  if (!fiveDayForecast || !city) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  // Error handling for missing population data
  if (!city.population) {
    return (
      <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
        <div className="top">
          <h2 className="flex items-center gap-2 font-medium">
            {people} Population
          </h2>
          <p className="pt-4 text-2xl">Data not available</p>
        </div>
        <p className="text-sm">Population data is currently unavailable for {city.name}.</p>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium" aria-label="Population Information">
          {people} Population
        </h2>
        <p className="pt-4 text-2xl">{formatNumber(city.population)}</p>
      </div>
      <p className="text-sm">Latest UN population data for {city.name}.</p>
    </div>
  );
}

export default Population;
