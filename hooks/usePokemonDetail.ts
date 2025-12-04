'use client';

import { useEffect, useState } from 'react';
import { Pokemon } from '@/lib/types';
import { fetchPokemonDetails } from '@/lib/api';
import { usePokemonCache } from '@/contexts/PokemonCacheContext';

export function usePokemonDetail(id: string) {
  const pokemonCache = usePokemonCache();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    // Check cache first
    const cached = pokemonCache.getPokemonDetail(id);
    if (cached) {
      setPokemon(cached);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchPokemonDetails(id);
      setPokemon(data);
      // Save to cache
      pokemonCache.setPokemonDetail(id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Pokémon details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  return {
    pokemon,
    isLoading,
    error,
    retry: load,
  };
}
