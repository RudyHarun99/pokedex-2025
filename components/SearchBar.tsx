'use client';

import { useSearchLocalValue } from '@/hooks/useSearchLocalValue';
import { CircleX, Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search Pokémon...'
}: SearchBarProps) {
  const {
    localValue,
    setLocalValue,
    handleClear,
  } = useSearchLocalValue(
    value,
    onChange,
  );

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 sm:mb-10">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
          <Search size={30} color='gray' />
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-11 sm:pl-14 pr-12 sm:pr-14 py-4 sm:py-5 text-base sm:text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pokemon-blue focus:border-pokemon-blue transition-all duration-200 text-gray-900 placeholder-gray-400 bg-white shadow-sm hover:shadow-md font-medium"
        />

        {/* Clear Button */}
        {localValue && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 sm:pr-5 flex items-center text-gray-400 hover:text-pokemon-red hover:scale-110 transition-all duration-200 min-w-11 min-h-11"
            aria-label="Clear search"
          >
            <CircleX />
          </button>
        )}
      </div>
    </div>
  );
}
