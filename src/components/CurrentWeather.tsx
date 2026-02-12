import LoadingStatesSkeleton from "./LoadingStatesSkeleton";
import IconsForConditions from "./IconsForConditions";
import WeatherCard from "./WeatherCard";
import { MapPinHouse } from "lucide-react";
import {
  Thermometer,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Cloud,
  Sunrise,
  Sunset,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";

interface CurrentWeatherProps {
  city: string;
  currWeatherData: any;
  loading: boolean;
  error: string | null;
  fetchWeatherByCoords?: (lat: number, lon: number) => void;
  setCity?: (city: string) => void;
}

const formatTime = (utc: number, timezone: number): string => {
  const localTime = new Date((utc + timezone) * 1000);

  return localTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
};

export default function CurrentWeather({
  currWeatherData,
  loading,
  error,
  city,
  fetchWeatherByCoords,
  setCity
}: CurrentWeatherProps) {
  if (!city) return <EmptyState message="Enter a city for 5-day forecast" />;
  if (loading) return <LoadingStatesSkeleton />;
  if (error) return <ErrorState error={error} />;
  if (!currWeatherData || !currWeatherData.main || !currWeatherData.weather) {
  return <EmptyState message="No current weather data available" />;
}


  const { main, weather, wind, clouds, visibility, sys, timezone } =
    currWeatherData;

   const handleLocationClick = async () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const cityName = await fetchWeatherByCoords?.(
      position.coords.latitude,
      position.coords.longitude
    );

    if (cityName && setCity) {
      setCity(cityName); 
    }
  });
};


  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      <button
        onClick={handleLocationClick}
        className="mt-4 inline-flex items-center gap-2 px-5 py-3
                   bg-linear-to-r from-purple-600 via-pink-600 to-orange-600
                   text-white font-semibold rounded-xl shadow-lg
                   hover:opacity-90 transition active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
      >
        <MapPinHouse className="w-5 h-5 text-white" />
        <span>Use My Current Location</span>
      </button>

      <header className="text-center">
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold 
                       text-transparent bg-clip-text bg-linear-to-r 
                       from-orange-600 to-purple-600 
                       dark:from-orange-400 dark:to-purple-400"
        >
          Today's Weather for {city}
        </h2>
      </header>

      <div
        className="p-6 sm:p-8 rounded-2xl
             bg-linear-to-r from-purple-600 via-pink-600 to-orange-600
             dark:from-purple-800 dark:via-pink-800 dark:to-orange-800
             shadow-2xl text-white"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-full bg-white/20 backdrop-blur-sm">
              <Thermometer className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            <div className="text-center sm:text-left">
              <p className="text-xs opacity-80 uppercase tracking-wide">
                Temperature
              </p>
              <p className="text-5xl sm:text-6xl font-extrabold leading-none">
                {Math.round(main.temp)}°C
              </p>
              <p className="text-sm opacity-90 mt-1">
                Feels like {Math.round(main.feels_like)}°C
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <IconsForConditions i={weather[0].icon} />
            <div className="text-center sm:text-left">
              <p className="text-xs opacity-80 uppercase tracking-wide">
                Conditions
              </p>
              <p className="text-lg sm:text-2xl font-bold uppercase">
                {weather[0].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <WeatherCard
          icon={ArrowUp}
          label="Max Temperature"
          value={Math.round(main.temp_max)}
          unit="°C"
        />
        <WeatherCard
          icon={ArrowDown}
          label="Min Temperature"
          value={Math.round(main.temp_min)}
          unit="°C"
        />
        <WeatherCard
          icon={Droplets}
          label="Humidity"
          value={main.humidity}
          unit="%"
        />
        <WeatherCard
          icon={Wind}
          label="Wind Speed"
          value={wind.speed}
          unit=" m/s"
        />
        <WeatherCard
          icon={Gauge}
          label="Pressure"
          value={main.pressure}
          unit=" hPa"
        />
        <WeatherCard
          icon={Cloud}
          label="Cloud Cover"
          value={clouds.all}
          unit="%"
        />
        <WeatherCard
          icon={Eye}
          label="Visibility"
          value={visibility / 1000}
          unit=" km"
        />
        <WeatherCard
          icon={Sunrise}
          label="Sunrise"
          value={formatTime(sys.sunrise, timezone)}
        />
        <WeatherCard
          icon={Sunset}
          label="Sunset"
          value={formatTime(sys.sunset, timezone)}
        />
      </div>
    </div>
  );
}
