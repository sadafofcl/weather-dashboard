import { useContext, useEffect, useState, useRef } from "react";
import useDebounce from "@/hooks/useDebounce";
import { FavouritesContext } from "@/context/FavouritesContext";
import { Search, Star, MapPin, Loader2, BookMarked, X } from "lucide-react";
import ButtonsForSearchBarComponent from "./ButtonsForSearchBarComponent";
import type { Dispatch, SetStateAction } from "react";
import Favourites from "./Favourites";
import Toast from "./Toast";

interface City {
  lat: number;
  lon: number;
  name: string;
  state?: string;
  country: string;
}

interface SearchBarProps {
  setCity: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({ setCity }: SearchBarProps) {
  const [searchVal, setSearchVal] = useState<string>("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const debounceCheck = useDebounce(searchVal);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info" as "success" | "error" | "info",
  })
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { favouritesList,addToFavourites, removeFromFavourites } = useContext(FavouritesContext);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSelected) return;

    if (debounceCheck.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${debounceCheck}&limit=20&appid=34f1a0bb9f6e351772d63ee557da9c6e`,
    )
      .then((res) => res.json())
      .then((res) => {
        setSuggestions(res);
        setShowSuggestions(res.length > 0);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("error in fetching cities name");
        setIsLoading(false);
      });
  }, [debounceCheck, isSelected]);

  const handleClick = (city: City) => {
    const cityString = `${city.name}${city.state ? `, ${city.state}` : ""}, ${city.country}`;
    setSearchVal(cityString);
    setCity(cityString);
    setSuggestions([]);
    setShowSuggestions(false);
    setIsSelected(true);
  };

  const handleClear = () => {
    setSearchVal("");
  };

  const [highlight, setHighlight] = useState<number>(-1);

  const handleKeyboardSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length && e.key !== "Enter") return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlight((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlight((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlight >= 0 && suggestions[highlight]) {
          handleClick(suggestions[highlight]);
        } else if (searchVal.trim()) {
          setIsSelected(true);
          setCity(searchVal);
          setSuggestions([]);
          setShowSuggestions(false);
        }
        break;

      case "Escape":
        setShowSuggestions(false);
        setHighlight(-1);
        break;
    }
  }

  const isFavourite = favouritesList.some(
  (item) => item.favCity === searchVal
);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-6">
      <div
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center"
        ref={wrapperRef}
      >
        <Toast
          message={toast.message}
          type={toast.type}
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
        />

        {/* //start search input and suggestion */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          {isLoading && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-600 dark:text-purple-400 animate-spin" />
          )}
          <input
            type="text"
            value={searchVal}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-12 py-3 rounded-lg
                                   border-2 border-purple-300 dark:border-purple-700
                                   bg-white dark:bg-gray-800
                                   text-gray-900 dark:text-gray-100
                                   placeholder-gray-400 dark:placeholder-gray-500
                                   focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                                   focus:border-transparent
                                   transition-all duration-200
                                   shadow-sm hover:shadow-md"
            onChange={(e) => {
              setSearchVal(e.target.value);
              setIsSelected(false);
            }}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
            onKeyDown={handleKeyboardSearch}
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50">
              <ul
                className="w-full bg-white dark:bg-gray-800 
                                           border-2 border-purple-300 dark:border-purple-700
                                           rounded-lg shadow-2xl overflow-hidden
                                           max-h-96 overflow-y-auto
                                           backdrop-blur-sm"
              >
                <li
                  className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 
                                               text-xs font-semibold text-purple-800 dark:text-purple-200
                                               border-b border-purple-200 dark:border-purple-700"
                >
                  {suggestions.length}{" "}
                  {suggestions.length === 1 ? "result" : "results"} found
                </li>
                {suggestions.map((city, index) => (
                  <li
                    key={`${city.lat}-${city.lon}-${index}`}
                    className={`group p-4 cursor-pointer transition-all duration-150
                      border-b border-gray-200 dark:border-gray-700 last:border-b-0
                      ${
                        highlight === index
                          ? "bg-purple-100 dark:bg-purple-900/40"
                          : "hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30"
                      }`}
                    onClick={() => handleClick(city)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-1 p-2 rounded-full bg-purple-100 dark:bg-purple-900/50
                                                            group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50
                                                            transition-colors duration-150"
                      >
                        <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div
                          className="font-semibold text-gray-900 dark:text-gray-100
                                                                group-hover:text-purple-700 dark:group-hover:text-purple-300
                                                                transition-colors duration-150"
                        >
                          {city.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                          {city.state && <>{city.state}, </>}
                          {city.country}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showSuggestions &&
            !isLoading &&
            searchVal.trim().length >= 2 &&
            suggestions.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50">
                <div
                  className="w-full bg-white dark:bg-gray-800 
                                           border-2 border-purple-300 dark:border-purple-700
                                           rounded-lg shadow-2xl p-6 text-center"
                >
                  <MapPin className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-2" />
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    No cities found
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Try a different search term
                  </p>
                </div>
              </div>
            )}
        </div>
        {/* //end  */}

        {searchVal && (
          <ButtonsForSearchBarComponent icon={X} onClick={handleClear}>
            Clear Input
          </ButtonsForSearchBarComponent>
        )}

        <ButtonsForSearchBarComponent
          icon={Search}
          onClick={() => {
            setIsSelected(true);
            setCity(searchVal);
            setSuggestions([]);
            setShowSuggestions(false);
          }}
          disabled={!searchVal.trim()}
        >
          Search
        </ButtonsForSearchBarComponent>

        <ButtonsForSearchBarComponent
            icon={Star}
            variant="warning"
            onClick={() => {
              if (!searchVal.trim()) return;

              if (!isFavourite) {
                addToFavourites(searchVal);

                setToast({
                  show: true,
                  message: "City added to favourites",
                  type: "success",
                });
              } else {
                removeFromFavourites(searchVal);

                setToast({
                  show: true,
                  message: "City removed from favourites",
                  type: "error",
                });
              }
            }}
            disabled={!searchVal.trim()}
          >
            {isFavourite ? "Remove Favourite" : "Add Favorite"}
          </ButtonsForSearchBarComponent>



        <Favourites
          setCity={setCity}
          button={
            <ButtonsForSearchBarComponent icon={BookMarked} variant="warning">
              Favourites
            </ButtonsForSearchBarComponent>
          }
        />
      </div>
    </section>
  );
}
