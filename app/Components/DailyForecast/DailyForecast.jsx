"use client";
import React from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { clearSky, cloudy, drizzleIcon, rain, snow } from "@/app/utils/icons";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import moment from "moment";
import { kelvinToCelsius } from "@/app/utils/misc";

function DailyForecast() {
  const { forecast, fiveDayForecast } = useGlobalContext();

  // Check if necessary data is available, if not return Skeleton
  if (!forecast?.weather || !fiveDayForecast?.city || !fiveDayForecast?.list) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const todayString = new Date().toISOString().split("T")[0];

  // Filter list for today's forecast
  const todaysForecast = fiveDayForecast.list.filter((forecast) =>
    forecast.dt_txt.startsWith(todayString)
  );

  // Get main weather condition for the icon
  const weatherMain = forecast.weather[0]?.main;

  // Helper function to get the weather icon
  const getIcon = (weatherMain) => {
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

  // If no data is available for today's forecast
  if (todaysForecast.length < 1) {
    return (
      <Skeleton className="h-[12rem] w-full col-span-full md:col-span-2 xl:col-span-2" />
    );
  }

  return (
    <div className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full md:col-span-2 xl:col-span-2">
      <div className="h-full flex gap-10 overflow-hidden">
        <Carousel>
          <CarouselContent>
            {todaysForecast.map((forecast) => (
              <CarouselItem
                key={forecast.dt_txt}
                className="flex flex-col gap-4 basis-[8.5rem] cursor-grab"
              >
                <p className="text-gray-300">
                  {moment(forecast.dt_txt).format("HH:mm")}
                </p>
                <p>{getIcon(weatherMain)}</p>
                <p className="mt-4">{kelvinToCelsius(forecast.main.temp)}°C</p>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default DailyForecast;
