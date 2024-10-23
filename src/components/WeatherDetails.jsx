import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

// Function to format the temperature based on the unit
const formatTemperature = (temp, units, isMinMaxOrFeelsLike = false) => {
  let colorShade;
  const temperature = Math.round(temp);

  if (units === "metric") {
    colorShade = temperature < 0 ? "text-blue-400" 
      : temperature < 20 ? "text-green-400" 
      : temperature < 30 ? "text-yellow-400" 
      : "text-red-500"; // Hot
  } else {
    colorShade = temperature < 32 ? "text-blue-400" 
      : temperature < 68 ? "text-green-400" 
      : temperature < 86 ? "text-yellow-400" 
      : "text-red-500"; // Hot
  }

  const fontSizeClass = isMinMaxOrFeelsLike ? "text-l" : "text-5xl";

  return (
    <span className={`${colorShade} ${fontSizeClass}`}>
      {`${temperature}°${units === "metric" ? "C" : "F"}`}
    </span>
  );
};

const WeatherDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
  units,
}) => {
  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Feels Like",
      value: formatTemperature(feels_like, units, true), 
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "mph"}`, // Use consistent speed units
    },
  ];

  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "Max",
      value: formatTemperature(temp_max, units, true), 
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Min",
      value: formatTemperature(temp_min, units, true), 
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-blue-300">
        <p>{details}</p>
      </div>

      <div className="flex flex-row items-center justify-between py-3">
        <img src={icon} alt="current weather condition" className="w-20" />
        <p>{formatTemperature(temp, units)}</p>

        <div className="flex flex-col space-y-3 items-start">
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className="flex font-light text-sm items-center justify-center"
            >
              <Icon size={18} className="mr-1" />
              {`${title}: `}
              <span className="font-medium ml-1">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-10 text-sm py-3">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className="flex flex-row items-center">
            <Icon size={30} />
            <p className="font-light ml-1">
              {`${title}: `}
              <span className="font-medium ml-1">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
