import { FavouritesContext } from "@/context/FavouritesContext";
import { useContext } from "react";
import { Heart, X, Cloud } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface FavouritesProps {
  setCity: Dispatch<SetStateAction<string>>,
  button: ReactNode
}

export default function Favourites({ setCity, button }: FavouritesProps) {
  const { favouritesList, removeFromFavourites } =
    useContext(FavouritesContext);

  const handleCheckWeather = (cityName: string) => {
    setCity(cityName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild><span>{button}</span></DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-rose-500 fill-current" />
              <span className="text-2xl font-bold text-rose-600">
                Favourites
              </span>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center">
            Favourites Collection
          </DialogDescription>
        </DialogHeader>

        <div className="no-scrollbar max-h-[50vh] overflow-y-auto">
          {favouritesList.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No favourites yet
            </p>
          ) : (
            <ul className="space-y-3">
              {favouritesList.map((element) => (
                <li
                  key={element.id}
                  className="
                    flex items-center justify-between gap-3
                    bg-white dark:bg-gray-800
                    border-2 border-teal-200 dark:border-purple-700
                    rounded-lg p-4
                    hover:border-teal-300 dark:hover:border-purple-600
                    transition-colors
                  "
                >
                  <span className="font-semibold text-gray-900 dark:text-gray-100 flex-1">
                    {element.favCity}
                  </span>

                  <button
                    onClick={() => handleCheckWeather(element.favCity)}
                    className="
                      px-3 py-1.5 rounded-md
                      bg-teal-500 hover:bg-teal-600
                      dark:bg-purple-600 dark:hover:bg-purple-700
                      text-white text-sm flex items-center gap-1.5
                    "
                  >
                    <Cloud className="w-4 h-4" />
                    <span className="hidden sm:inline">Check</span>
                  </button>

                  <button
                    onClick={() => removeFromFavourites(element.id)}
                    className="
                      px-3 py-1.5 rounded-md
                      bg-rose-500 hover:bg-rose-600
                      text-white text-sm flex items-center gap-1.5
                    "
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

