'use client';

import { Pokemon } from '@/lib/types';
import { formatPokemonName, formatPokemonId } from '@/lib/utils';
import { usePokemonCard } from '@/hooks/usePokemonCard';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({
  pokemon,
}: PokemonCardProps) {
  const {
    handleClick,
    handleImageError,
    imageUrl,
  } = usePokemonCard(
    pokemon,
  )

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 active:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group min-h-60 sm:min-h-[260px] border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative bg-linear-to-br from-blue-50 to-purple-50 p-4 sm:p-6 flex items-center justify-center h-40 sm:h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={formatPokemonName(pokemon.name)}
          onError={handleImageError}
          className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 drop-shadow-lg"
        />
      </div>

      {/* Name Container */}
      <div className="p-3 sm:p-4 bg-linear-to-b from-white to-gray-50">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 text-center capitalize leading-tight group-hover:text-pokemon-blue transition-colors duration-200">
          {formatPokemonName(pokemon.name)}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 text-center mt-1 font-medium">
          #{formatPokemonId(pokemon.id)}
        </p>
      </div>
    </div>
  );
}
