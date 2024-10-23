import { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

const SearchInputs = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("metric");

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && city !== "") {
      handleSearchClick();
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setQuery({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Failed to retrieve location. Please try again.");
        }
      );
    }
  };

  const handleUnitChange = (unit) => {
    setUnits(unit);
    setSelectedUnit(unit);
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4 bg-gray-900 rounded-lg p-2">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Discover your weather..."
          className="bg-gray-800 text-white text-xl font-light p-2 w-full rounded-lg focus:outline-none placeholder:lowercase"
          aria-label="Search city"
        />
        <BiSearch
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125 text-primary"
          onClick={handleSearchClick}
          aria-label="Search"
        />
        <BiCurrentLocation
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125 text-primary"
          onClick={handleLocationClick}
          aria-label="Use current location"
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          className={`text-2xl font-medium transition ease-out hover:scale-125 ${
            selectedUnit === "metric"
              ? "bg-gray-700 border-2 border-green-500 shadow-md text-green-500"
              : "bg-gray-800 border-2 border-gray-600 text-primary-foreground"
          } rounded-lg py-1 px-2`}
          onClick={() => handleUnitChange("metric")}
          aria-label="Switch to Celsius"
        >
          °C
        </button>
        <p className="text-2xl font-medium mx-1 text-muted-foreground">|</p>
        <button
          className={`text-2xl font-medium transition ease-out hover:scale-125 ${
            selectedUnit === "imperial"
              ? "bg-gray-700 border-2 border-green-500 shadow-md text-green-500"
              : "bg-gray-800 border-2 border-gray-600 text-primary-foreground"
          } rounded-lg py-1 px-2`}
          onClick={() => handleUnitChange("imperial")}
          aria-label="Switch to Fahrenheit"
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default SearchInputs;
