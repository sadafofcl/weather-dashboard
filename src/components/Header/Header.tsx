import ThemeToggle from "../Header/ThemeToggle";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-300 dark:border-gray-700
                       bg-linear-to-r from-indigo-800 via-purple-600 to-pink-600
                       dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900
                       shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">        
        <h1 className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-purple-300 to-pink-300
                       dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400
                       font-extrabold text-xl sm:text-2xl text-center sm:text-left
                       uppercase tracking-wide drop-shadow-lg
                       select-none w-full sm:w-auto">
          Weather Dashboard
        </h1>

        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}