import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { toggleTheme, currTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center gap-2 px-4 py-2 rounded-full
                 bg-linear-to-r from-cyan-200 via-purple-200 to-pink-200
                 dark:from-cyan-700 dark:via-purple-800 dark:to-pink-800
                 text-gray-900 dark:text-gray-100 font-semibold shadow-lg
                 hover:scale-105 hover:shadow-xl active:scale-95
                 transition-all duration-300 text-sm sm:text-base
                 border border-purple-300 dark:border-purple-600"
    >
      {currTheme === "light" ? (
        <Moon className="w-5 h-5 text-purple-600 dark:text-purple-300" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-500 dark:text-yellow-300" />
      )}
      <span>
        {currTheme === "light" ? "Dark Mode" : "Light Mode"}
      </span>
    </button>
  );
}