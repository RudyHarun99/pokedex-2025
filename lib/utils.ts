// Utility functions for formatting and data manipulation

/**
 * Capitalize the first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format Pokémon name by capitalizing and replacing hyphens with spaces
 * @param name - Pokémon name from API
 * @returns Formatted name
 */
export function formatPokemonName(name: string): string {
  if (!name) return '';
  return name
    .split('-')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Format Pokémon id
 * @param id - Pokémon id from API
 * @returns Formatted id
 */
export function formatPokemonId(id: number): string {
  if (!id) return '';
  return id.toString().padStart(3, '0');
}

/**
 * Format Stat Name
 * @param name - Pokémon stat name from API
 * @returns Formatted stat name
 */
export function formatStatName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Color base on stat value
 * @param value - Pokémon stat value from API
 * @returns Color code base on stat value
 */
export function getStatColor(value: number): string {
  if (value >= 150) return 'bg-green-500';
  if (value >= 100) return 'bg-blue-500';
  if (value >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
};

/**
 * Calculate percentage based on max stat value
 * @param value - Pokémon stat value from API
 * @returns Color code base on stat value
 */
export function calculatePercentage(
  value: number,
  maxValue: number,
): number {
  return Math.min((value / maxValue) * 100, 100);
};

/**
 * Convert height from decimeters to meters
 * @param heightInDecimeters - Height value from API (in decimeters)
 * @returns Height in meters with one decimal place
 */
export function convertHeight(heightInDecimeters: number): string {
  const meters = heightInDecimeters / 10;
  return `${meters.toFixed(1)} m`;
}

/**
 * Convert weight from hectograms to kilograms
 * @param weightInHectograms - Weight value from API (in hectograms)
 * @returns Weight in kilograms with one decimal place
 */
export function convertWeight(weightInHectograms: number): string {
  const kilograms = weightInHectograms / 10;
  return `${kilograms.toFixed(1)} kg`;
}

/**
 * Extract Pokémon ID from PokéAPI URL
 * @param url - API URL containing Pokémon ID
 * @returns Pokémon ID as number
 */
export function extractIdFromUrl(url: string): number {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
}

/**
 * Get color class for Pokémon type
 * @param typeName - Pokémon type name
 * @returns TailwindCSS color classes
 */
export function getTypeColor(typeName: string): string {
  const typeColors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-cyan-400',
    fighting: 'bg-orange-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-700',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };
  
  return typeColors[typeName.toLowerCase()] || 'bg-gray-400';
}

/**
 * Generate page numbers to display
 * @param typeName - Pokémon type name
 * @returns TailwindCSS color classes
 */
export function getPageNumbers(
  totalPages: number,
  currentPage: number,
) {
  const pages: (number | string)[] = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    // Show all pages if total is small
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    pages.push(totalPages);
  }

  return pages;
};
