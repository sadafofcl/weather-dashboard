interface WeatherDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  colSpan?: boolean;
}

export default function WeatherDetailCard({ icon, label, value, colSpan = false }: WeatherDetailProps) {
    return (
            <div
            className={`p-3 rounded-lg 
                bg-gray-50 dark:bg-gray-700/50 
                border border-gray-200 dark:border-gray-600
                transition-all duration-200
                hover:bg-gray-100 dark:hover:bg-gray-700
                hover:shadow-sm dark:hover:shadow-gray-900/50
                ${colSpan ? "col-span-2" : ""}`}
                >
                    
                <div className="flex items-center gap-2 mb-1.5">
                    {icon}
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                        {label}
                    </span>
                </div>

                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {value}
                </p>
                
            </div>
        )
}