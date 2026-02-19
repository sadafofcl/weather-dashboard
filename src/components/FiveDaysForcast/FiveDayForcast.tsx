import EmptyState from "../States/EmptyState";
import ErrorState from "../States/ErrorState";
import LoadingStatesSkeleton from "../States/LoadingStatesSkeleton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ForecastCard from "../FiveDaysForcast/ForcastCard";


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

interface FiveDayForecastProps {
  city: string;
  forcastData: { list: ForecastItem[] } | null;
  loading: boolean;
  error: string | null;
}

export default function FiveDayForecast({
  city,
  forcastData,
  loading,
  error,
}: FiveDayForecastProps) {

  if (!city) return <EmptyState message="" />;
  if (loading) return <LoadingStatesSkeleton />;
  if (error) return <ErrorState error={error} />;
  if (!forcastData) return <EmptyState message="No forecast data available" />;

  //group in dates
  const daysMap: Record<string, ForecastItem[]> = {};
  forcastData.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!daysMap[date]) {
      daysMap[date] = [];
    }
    daysMap[date].push(item);
  });
  const days = Object.keys(daysMap);


  const formatDate = (dateString: string) => { 
    return new Date(dateString).toLocaleDateString("en-IN", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 bg-transparent dark:bg-transparent">
      <header className="text-center px-2">
        <h1
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold 
                     text-transparent bg-clip-text bg-linear-to-r 
                     from-teal-600 to-purple-600 
                     dark:from-teal-400 dark:to-purple-400
                     leading-tight drop-shadow-sm"
        >
          5-Day Forecast for {city}
        </h1>
      </header>


      {/* for each date - differnt time stamps */}
      {days.map((day) => (
        <section key={day} className="space-y-3 sm:space-y-4">
          <h2
            className="text-lg sm:text-xl md:text-2xl font-bold text-center
                       text-teal-700 dark:text-purple-300"
          >
            {formatDate(day)}
          </h2>

          <Carousel className="w-full">
            <CarouselContent className="-ml-2 sm:-ml-4">
              {daysMap[day].map((item) => (
                <CarouselItem
                  key={item.dt}
                  className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <ForecastCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>

        {/* carousel button prev/next */}
            <div className="flex justify-center gap-2 sm:gap-4 mt-4 sm:mt-6">
              <CarouselPrevious
                className="static translate-y-0 
                           bg-linear-to-r from-teal-500 to-purple-500
                           dark:from-teal-600 dark:to-purple-600
                           hover:from-teal-600 hover:to-purple-600
                           dark:hover:from-teal-700 dark:hover:to-purple-700
                           text-white font-semibold
                           px-4 sm:px-6 py-2 rounded-lg
                           transition-all duration-200
                           hover:scale-105 
                           shadow-md hover:shadow-lg
                           dark:shadow-gray-900/50 dark:hover:shadow-purple-900/50
                           text-sm sm:text-base"
              />
              <CarouselNext
                className="static translate-y-0
                           bg-linear-to-r from-teal-500 to-purple-500
                           dark:from-teal-600 dark:to-purple-600
                           hover:from-teal-600 hover:to-purple-600
                           dark:hover:from-teal-700 dark:hover:to-purple-700
                           text-white font-semibold
                           px-4 sm:px-6 py-2 rounded-lg
                           transition-all duration-200
                           hover:scale-105 
                           shadow-md hover:shadow-lg
                           dark:shadow-gray-900/50 dark:hover:shadow-purple-900/50
                           text-sm sm:text-base"
              />
            </div>
          </Carousel>
        </section>
      ))}
    </div>
  );
}