import { useContext, useEffect, useState, useRef } from "react";
import useDebounce from "@/hooks/useDebounce";
import { FavouritesContext } from "@/context/FavouritesContext";
import { Search, Star, MapPin, Loader2, BookMarked, X } from "lucide-react";
import ButtonsForSearchBarComponent from "./ButtonsForSearchBarComponent";
import type { Dispatch, SetStateAction } from "react";
import Favourites from "./Favourites";
import Toast from "./Toast";

/*  TYPES  */

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

type ToastType = "success" | "error" | "info";

interface ToastState {
  show: boolean;
  message: string;
  type: ToastType;
}

/*  COMPONENT  */

export default function SearchBar({ setCity }: SearchBarProps) {
  /*  STATE  */

  const [searchVal, setSearchVal] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const [isSelected, setIsSelected] = useState(false);

  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "info",
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceCheck = useDebounce(searchVal);

  /*  CONTEXT  */

  const { favouritesList, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);

  const isFavourite = favouritesList.some((item) => item.favCity === searchVal);

  /*  DERIVED  */

  const shouldShowSuggestions =
    searchVal.trim().length >= 2 && (suggestions.length > 0 || isLoading);

  /*  HELPERS  */

  const resetSuggestions = () => {
    setSuggestions([]);
    setHighlight(-1);
  };

  const selectCity = (cityString: string) => {
    setSearchVal(cityString);
    setCity(cityString);
    setIsSelected(true);
    resetSuggestions();
  };

  /*  HANDLERS  */

  const handleCityClick = (city: City) => {
    const cityString = `${city.name}${
      city.state ? `, ${city.state}` : ""
    }, ${city.country}`;

    selectCity(cityString);
  };

  const handleSearchSubmit = () => {
    if (!searchVal.trim()) return;

    if (!isSelected) {
      setToast({
        show: true,
        message: "Please select a valid city from suggestions",
        type: "error",
      });
      return;
    }

    setCity(searchVal);
  };

  const handleClear = () => {
    setSearchVal("");
    setIsSelected(false);
    resetSuggestions();
  };

  const handleToggleFavourite = () => {
    if (!searchVal.trim()) return;
    if (!isSelected) {
      setToast({
        show: true,
        message: "Select a valid city from suggesstions to add favourites",
        type: "error",
      });
      return;
    }
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
  };

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
          handleCityClick(suggestions[highlight]);
        } else {
          handleSearchSubmit();
        }
        break;

      case "Escape":
        resetSuggestions();
        break;
    }
  };

  /*  EFFECTS  */

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        resetSuggestions();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch city suggestions
  // will make use of useFetch hook after making it reusable
  // need to make changes in useFetch

  useEffect(() => {
    if (isSelected) return;

    if (debounceCheck.trim().length < 2) {
      resetSuggestions();
      return;
    }

    setIsLoading(true);

    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${debounceCheck}&limit=20&appid=34f1a0bb9f6e351772d63ee557da9c6e`,
    )
      .then((res) => res.json())
      .then((res) => {
        setSuggestions(res);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("error in fetching cities name");
        setIsLoading(false);
      });
  }, [debounceCheck, isSelected]);

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

        {/*  SEARCH INPUT  */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {isLoading && (
              <Loader2 className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-spin" />
            )}

            {searchVal && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            )}
          </div>

          <input
            type="text"
            value={searchVal}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-16 py-3 rounded-lg
             border-2 border-purple-300 dark:border-purple-700
             bg-white dark:bg-gray-800
             text-gray-900 dark:text-gray-100
             placeholder-gray-400 dark:placeholder-gray-500
             focus:outline-none focus:ring-2 focus:ring-purple-500
             focus:border-transparent
             transition-all duration-200
             shadow-sm hover:shadow-md"
            onChange={(e) => {
              setSearchVal(e.target.value);
              setIsSelected(false);
            }}
            onKeyDown={handleKeyboardSearch}
          />

          {/*  SUGGESTIONS  */}
          {shouldShowSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50">
              <ul className="w-full bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-700 rounded-lg shadow-2xl overflow-hidden max-h-96 overflow-y-auto">
                <li className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-xs font-semibold text-purple-800 dark:text-purple-200 border-b border-purple-200 dark:border-purple-700">
                  {suggestions.length}{" "}
                  {suggestions.length === 1 ? "result" : "results"} found
                </li>

                {suggestions.map((city, index) => (
                  <li
                    key={`${city.lat}-${city.lon}-${index}`}
                    className={`group p-4 cursor-pointer transition-all duration-150 border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
                      highlight === index
                        ? "bg-purple-100 dark:bg-purple-900/40"
                        : "hover:bg-purple-50 dark:hover:bg-purple-900/30"
                    }`}
                    onClick={() => handleCityClick(city)}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-1" />
                      <div>
                        <div className="font-semibold">{city.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
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

          {/*  EMPTY STATE  */}
          {shouldShowSuggestions && !isLoading && suggestions.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50">
              <div className="w-full bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-700 rounded-lg shadow-2xl p-6 text-center">
                <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  No cities found
                </p>
              </div>
            </div>
          )}
        </div>

        {/*  BUTTONS  */}

        <ButtonsForSearchBarComponent
          icon={Search}
          onClick={handleSearchSubmit}
          disabled={!searchVal.trim()}
        >
          Search
        </ButtonsForSearchBarComponent>

        <ButtonsForSearchBarComponent
          icon={Star}
          variant="warning"
          onClick={handleToggleFavourite}
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
