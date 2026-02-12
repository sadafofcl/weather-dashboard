import { useEffect, useState } from "react";

export default function NetworkComponent() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <div className="justify-items-center">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-monitor-off-icon lucide-monitor-off"
            >
            <path d="M12 17v4" />
            <path d="M17 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 1.184-1.826" />
            <path d="m2 2 20 20" />
            <path d="M8 21h8" />
            <path d="M8.656 3H20a2 2 0 0 1 2 2v10a2 2 0 0 1-.293 1.042" />
            </svg>
        </div>

        <h1 className="text-xl font-bold text-red-600 mt-4">
          YOU ARE OFFLINE !!!
        </h1>
        <h3 className="text-gray-700 mt-2">Check your internet connection.</h3>
      </div>
    </div>
  );
}
