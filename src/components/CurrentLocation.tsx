import { MapPinHouse } from "lucide-react";

interface Prop {
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
  setResetSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CurrentLocation({ fetchWeatherByCoords,setResetSearch }: Prop) {

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      setResetSearch(true);
    });
  };

  return (
    <div className="flex justify-center mt-4">
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
    </div>
  );
}
