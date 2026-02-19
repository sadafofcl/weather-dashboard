import type { LucideIcon } from "lucide-react";

interface WeatherCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
}

export default function WeatherCard({ icon: Icon, label, value, unit = "" }: WeatherCardProps) {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" /> {/* lucid */}
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{label}</p>
      </div>
      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        {value}{unit}
      </p>
    </div>
  );
}