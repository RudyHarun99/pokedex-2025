'use client';

import Hero from '@/components/Hero';
import Pagination from '@/components/Pagination';
import ErrorMessage from '@/components/ErrorMessage';
import PokemonCard from '@/components/PokemonCard';
import PokemonCardSkeleton from '@/components/PokemonCardSkeleton';
import { usePokemonData } from '@/hooks/usePokemonData';
import { usePokemonQueryParams } from '@/hooks/usePokemonQueryParams';

const ITEMS_PER_PAGE = 20;

export default function Home() {
  const {
    searchTerm,
    currentPage,
    handleSearchChange,
    handlePageChange
  } = usePokemonQueryParams();

  const {
    displayedPokemon,
    totalPages,
    isLoading,
    error,
    retry,
  } = usePokemonData(
    ITEMS_PER_PAGE,
    searchTerm,
    currentPage,
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-fade-in">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <PokemonCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="animate-scale-in">
            <ErrorMessage message={error} onRetry={retry} />
          </div>
        )}

        {/* Empty Search Results */}
        {!isLoading &&
          !error &&
          displayedPokemon.length === 0 &&
          searchTerm && (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-xl font-semibold">
                No Pokémon found for "{searchTerm}"
              </p>
            </div>
          )}

        {/* Pokémon Grid */}
        {!isLoading &&
        !error &&
        displayedPokemon.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-fade-in">
              {displayedPokemon.map((p) => (
                <PokemonCard key={p.id} pokemon={p} />
              ))}
            </div>

            {/* Pagination (condition: no search) */}
            {!searchTerm && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}
