'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { Pokemon, PokemonListItem } from '@/lib/types';

interface CacheData {
  // Cache untuk list semua pokemon
  allPokemonList: PokemonListItem[];
  totalCount: number;
  // Cache untuk detail pokemon berdasarkan ID
  pokemonDetails: Record<string | number, Pokemon>;
  // Timestamp untuk invalidasi cache (opsional)
  timestamp: number;
}

interface PokemonCacheContextType {
  cache: CacheData;
  // Set all pokemon list
  setAllPokemonList: (list: PokemonListItem[], count: number) => void;
  // Get/Set pokemon detail
  getPokemonDetail: (id: string | number) => Pokemon | undefined;
  setPokemonDetail: (id: string | number, pokemon: Pokemon) => void;
  // Set multiple pokemon details sekaligus
  setPokemonDetails: (pokemons: Pokemon[]) => void;
  // Clear cache
  clearCache: () => void;
  // Check if cache exists
  hasAllPokemonList: () => boolean;
}

const PokemonCacheContext = createContext<
PokemonCacheContextType | undefined
>(
  undefined
);

const CACHE_DURATION = 30 * 60 * 1000; // 30 menit

export function PokemonCacheProvider({
children
}: {
children: ReactNode
}) {
  const [cache, setCache] = useState<CacheData>({
    allPokemonList: [],
    totalCount: 0,
    pokemonDetails: {},
    timestamp: Date.now(),
  });

  const setAllPokemonList = useCallback(
    (list: PokemonListItem[], count: number) => {
      setCache((prev) => ({
        ...prev,
        allPokemonList: list,
        totalCount: count,
        timestamp: Date.now(),
      }));
    },
    []
  );

  const getPokemonDetail = useCallback(
    (id: string | number) => {
      // Check if cache is still valid
      const now = Date.now();
      if (now - cache.timestamp > CACHE_DURATION) {
        return undefined;
      }
      return cache.pokemonDetails[id];
    },
    [cache]
  );

  const setPokemonDetail = useCallback(
    (id: string | number, pokemon: Pokemon) => {
      setCache((prev) => ({
        ...prev,
        pokemonDetails: {
          ...prev.pokemonDetails,
          [id]: pokemon,
        },
      }));
    }, []
  );

  const setPokemonDetails = useCallback(
    (pokemons: Pokemon[]) => {
      setCache((prev) => {
        const newDetails = { ...prev.pokemonDetails };
        pokemons.forEach((pokemon) => {
          newDetails[pokemon.id] = pokemon;
        });
        return {
          ...prev,
          pokemonDetails: newDetails,
        };
      });
    }, []
  );

  const clearCache = useCallback(() => {
    setCache({
      allPokemonList: [],
      totalCount: 0,
      pokemonDetails: {},
      timestamp: Date.now(),
    });
  }, []);

  const hasAllPokemonList = useCallback(() => {
    const now = Date.now();
    // Check if cache is still valid and has data
    return (
      cache.allPokemonList.length > 0 &&
      now - cache.timestamp <= CACHE_DURATION
    );
  }, [cache]);

  return (
    <PokemonCacheContext.Provider
      value={{
        cache,
        setAllPokemonList,
        getPokemonDetail,
        setPokemonDetail,
        setPokemonDetails,
        clearCache,
        hasAllPokemonList,
      }}
    >
      {children}
    </PokemonCacheContext.Provider>
  );
}

export function usePokemonCache() {
  const context = useContext(PokemonCacheContext);
  if (context === undefined) {
    throw new Error('usePokemonCache must be used within a PokemonCacheProvider');
  }
  return context;
}
