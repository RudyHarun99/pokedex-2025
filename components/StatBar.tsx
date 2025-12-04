// StatBar component for visualizing Pokémon base stats

import {
  calculatePercentage,
  formatStatName,
  getStatColor,
} from "@/lib/utils";

interface StatBarProps {
  statName: string;
  value: number;
  maxValue?: number;
}

export default function StatBar({
  statName,
  value,
  maxValue = 255,
}: StatBarProps) {
  // Calculate percentage based on max stat value
  const percentage = calculatePercentage(value, maxValue);
  const statColor = getStatColor(value);

  return (
    <div className="mb-4 sm:mb-5 group">
      {/* Stat name and value */}
      <div className="flex justify-between items-center mb-2 sm:mb-2.5">
        <span className="text-sm sm:text-base font-bold text-gray-700 capitalize tracking-wide">
          {formatStatName(statName)}
        </span>
        <span className="text-base sm:text-lg md:text-xl font-extrabold text-gray-900 min-w-[50px] text-right bg-gray-100 px-3 py-1 rounded-lg">
          {value}
        </span>
      </div>

      {/* Progress bar container */}
      <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
        {/* Progress bar fill */}
        <div
          className={`h-full ${statColor} transition-all duration-500 ease-out rounded-full shadow-sm group-hover:shadow-md relative overflow-hidden`}
          style={{ width: `${percentage}%` }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-20"></div>
        </div>
      </div>
    </div>
  );
}
