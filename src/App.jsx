import { useEffect, useState } from "react";
import Forecast from "./components/WeatherForecast";
import Inputs from "./components/SearchInputs";
import TempAndDetails from "./components/WeatherDetails";
import TimeAndLocation from "./components/CurrentTimeAndLocation";
import TopButtons from "./components/CityButtons";
import getFormattedWeatherData from "./services/weatherService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {
  const [query, setQuery] = useState({ q: "Mumbai" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    const cityName = query.q || "current location";
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`);
    
    setLoading(true); // Set loading state to true
    try {
      const data = await getFormattedWeatherData({ ...query, units });
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather(data);
    } catch (error) {
      toast.error("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    return weather.temp <= threshold ? "from-cyan-600 to-blue-700" : "from-yellow-400 to-red-600"; // Different background for warm weather
  };

  return (
    <div
      className={`mx-auto max-w-screen-lg m-3 py-5 px-32 bg-black shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />

      {loading ? (
        <p className="text-center text-white">Loading...</p> // Loading indicator
      ) : weather ? (
        <>
          {/* Time and Location Card with shadow */}
          <div className="rounded-lg shadow-lg p-4 bg-gray-900 mb-4">
            <TimeAndLocation weather={weather} />
          </div>

          {/* Temp and Details Card with shadow */}
          <div className="rounded-lg shadow-lg p-4 bg-gray-900 mb-4">
            <TempAndDetails weather={weather} units={units} />
          </div>

          {/* Forecasts Cards  */}
          <div className="flex flex-row justify-between space-x-8">
            <div className="w-1/2">
              <div className="rounded-lg shadow-lg p-4 bg-gray-900">
                <Forecast title="Todays Higlights" data={weather.hourly} />
              </div>
            </div>
            <div className="w-1/2">
              <div className="rounded-lg shadow-lg p-4 bg-gray-900">
                <Forecast title="Weekly Forecast" data={weather.daily} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-white">No weather data available.</p> // Fallback if no data
      )}

      <ToastContainer autoClose={1000} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default App;
