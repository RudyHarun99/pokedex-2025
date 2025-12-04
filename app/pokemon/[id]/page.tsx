'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { usePokemonDetail } from '@/hooks/usePokemonDetail';
import { ArrowLeft } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import StatBar from '@/components/StatBar';
import {
  formatPokemonName,
  convertHeight,
  convertWeight,
  getTypeColor,
} from '@/lib/utils';

interface PokemonDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function PokemonDetailPage({
  params
}: PokemonDetailPageProps) {
  const router = useRouter();
  const { id } = use(params);

  // 🔥 pakai custom hook
  const {
    pokemon,
    isLoading,
    error,
    retry,
  } = usePokemonDetail(
    id,
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage
          message={error || 'Pokémon not found'}
          onRetry={retry}
        />
      </div>
    );
  }

  const imageUrl =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-6 sm:mb-8 flex items-center gap-2 text-pokemon-blue hover:text-pokemon-red font-semibold transition-all duration-200 min-h-11 py-2 px-3 rounded-lg hover:bg-white hover:shadow-md group"
        >
          <ArrowLeft size={30} />
          <span className="text-base sm:text-lg">Back to List</span>
        </button>

        {/* Main card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-scale-in">

          {/* Header */}
          <div className="bg-linear-to-r from-pokemon-yellow via-yellow-500 to-yellow-900 p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">

              {/* Image */}
              <div className="shrink-0">
                <div className="bg-white rounded-full p-4 sm:p-5 shadow-2xl ring-4 ring-white ring-opacity-50 hover:scale-105 transition-transform duration-300">
                  <img
                    src={imageUrl}
                    alt={pokemon.name}
                    className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain drop-shadow-xl"
                  />
                </div>
              </div>

              {/* Basic info */}
              <div className="flex-1 text-center md:text-left w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg">
                  {formatPokemonName(pokemon.name)}
                </h1>
                <p className="text-blue-500 text-lg sm:text-xl md:text-2xl mb-6 font-semibold">
                  #{pokemon.id.toString().padStart(3, '0')}
                </p>

                {/* Types */}
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start mb-6">
                  {pokemon.types.map((typeInfo) => (
                    <span
                      key={typeInfo.type.name}
                      className={`${getTypeColor(typeInfo.type.name)} text-white px-4 py-2 rounded-full font-bold uppercase shadow-lg text-sm sm:text-base`}
                    >
                      {typeInfo.type.name}
                    </span>
                  ))}
                </div>

                {/* Height/Weight */}
                <div className="flex gap-4 md:gap-6 justify-center md:justify-start flex-wrap">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl px-5 py-3 border border-white border-opacity-30">
                    <p className="text-blue-500 text-sm font-semibold uppercase tracking-wide">Height</p>
                    <p className="text-gray-700 font-extrabold text-xl md:text-2xl mt-1">
                      {convertHeight(pokemon.height)}
                    </p>
                  </div>

                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl px-5 py-3 border border-white border-opacity-30">
                    <p className="text-blue-500 text-sm font-semibold uppercase tracking-wide">Weight</p>
                    <p className="text-gray-700 font-extrabold text-xl md:text-2xl mt-1">
                      {convertWeight(pokemon.weight)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-12 bg-linear-to-b from-white to-gray-50">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-8">
              Base Stats
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              {pokemon.stats.map((statInfo) => (
                <StatBar
                  key={statInfo.stat.name}
                  statName={statInfo.stat.name}
                  value={statInfo.base_stat}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
