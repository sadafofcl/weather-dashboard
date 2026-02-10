import { Thermometer, Droplets, Wind, Gauge, Cloud, Eye } from "lucide-react";
import IconsForConditions from "./IconsForConditions";
import WeatherDetailCard from "./WeatherDetailCard";
interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
}

export default function ForecastCard({ item }: { item: ForecastItem }){

    const formatTime = (dateTimeString: string) => {
        return new Date(dateTimeString).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        });
    };
  
  return (
    <div
    className="bg-white dark:bg-gray-800 
    rounded-2xl shadow-lg dark:shadow-gray-900/50
    p-4 sm:p-6 
    border-2 border-teal-200 dark:border-purple-700 
    hover:shadow-2xl dark:hover:shadow-purple-900/50
    hover:border-teal-300 dark:hover:border-purple-600
    transition-all duration-300 h-full"
    >
      {/* Time stamp */}
      <div className="text-center mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg sm:text-xl font-bold text-teal-700 dark:text-purple-300">
          {formatTime(item.dt_txt)}
        </h3>
      </div>

      {/* Weather Icon & Description */}
      <div className="flex flex-col items-center mb-4 sm:mb-6">
        <div className="mb-2 sm:mb-3 scale-90 sm:scale-100">
          <IconsForConditions i={item.weather[0].icon} />
        </div>
        <p className="text-sm sm:text-base font-semibold uppercase text-center text-gray-800 dark:text-gray-200">
          {item.weather[0].description}
        </p>
      </div>

      {/* Main Temperature */}
      <div
        className="text-center mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl
        bg-linear-to-r from-purple-100 to-pink-100
        dark:from-purple-900/30 dark:to-pink-900/30"
        >
        <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          {Math.round(item.main.temp)}°C
        </p>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
          Feels like {Math.round(item.main.feels_like)}°C
        </p>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <WeatherDetailCard
          icon={<Thermometer className="w-4 h-4 text-teal-600 dark:text-purple-400" />}
          label="Temp Range"
          value={`${Math.round(item.main.temp_min)}°C - ${Math.round(item.main.temp_max)}°C`}
          colSpan
          />
        <WeatherDetailCard
          icon={<Droplets className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
          label="Humidity"
          value={`${item.main.humidity}%`}
          />
        <WeatherDetailCard
          icon={<Wind className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
          label="Wind"
          value={`${item.wind.speed} m/s`}
          />
        <WeatherDetailCard
          icon={<Gauge className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
          label="Pressure"
          value={`${item.main.pressure} hPa`}
          />
        <WeatherDetailCard
          icon={<Cloud className="w-4 h-4 text-gray-600 dark:text-gray-400" />}
          label="Clouds"
          value={`${item.clouds.all}%`}
          />
        <WeatherDetailCard
          icon={<Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
          label="Visibility"
          value={`${item.visibility / 1000} km`}
          />
      </div>
    </div>
  );
};