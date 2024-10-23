import React from "react";

const CityButtons = ({ setQuery }) => {
  const cities = [
    { id: 1, name: "Delhi" },
    { id: 2, name: "Mumbai" },
    { id: 3, name: "Kolkata" },
    { id: 4, name: "Chennai" },
    { id: 5, name: "Bengaluru" },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-lg font-medium transition ease-in-out bg-gray-900 hover:bg-gray-700/70 px-4 py-2 rounded-lg shadow-lg"
          onClick={() => setQuery({ q: city.name })}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default CityButtons;
