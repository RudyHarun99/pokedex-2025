'use client';

import { useEffect, useState } from 'react';
import { Pokemon, PokemonListItem } from '@/lib/types';
import { fetchPokemonList, fetchMultiplePokemon } from '@/lib/api';
import { extractIdFromUrl } from '@/lib/utils';
import { usePokemonCache } from '@/contexts/PokemonCacheContext';

export function usePokemonData(
    ITEMS_PER_PAGE: number,
    searchTerm: string,
    currentPage: number,
) {
  const pokemonCache = usePokemonCache();
  const [allPokemonList, setAllPokemonList] = useState<PokemonListItem[]>([]);
  const [displayedPokemon, setDisplayedPokemon] = useState<Pokemon[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ------------------------------
  // Fetch All Names
  // ------------------------------
  const loadAllPokemonNames = async () => {
    // Check cache first
    if (pokemonCache.hasAllPokemonList()) {
      setAllPokemonList(pokemonCache.cache.allPokemonList);
      setTotalCount(pokemonCache.cache.totalCount);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const initial = await fetchPokemonList(1, 0);
      const total = initial.count;
      setTotalCount(total);

      const list = await fetchPokemonList(total, 0);
      setAllPokemonList(list.results);
      
      // Save to cache
      pokemonCache.setAllPokemonList(list.results, total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Pokémon list');
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------
  // Fetch Pokémon to Display
  // ------------------------------
  const loadDisplayedPokemon = async () => {
    if (allPokemonList.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      let items: PokemonListItem[];

      if (searchTerm.trim() === '') {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        items = allPokemonList.slice(start, end);
      } else {
        items = allPokemonList.filter(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      const ids = items.map(item => extractIdFromUrl(item.url));
      
      // Check cache for each pokemon
      const cachedData: Pokemon[] = [];
      const idsToFetch: (string | number)[] = [];
      
      ids.forEach(id => {
        const cached = pokemonCache.getPokemonDetail(id);
        if (cached) {
          cachedData.push(cached);
        } else {
          idsToFetch.push(id);
        }
      });
      
      // Fetch only missing data
      let fetchedData: Pokemon[] = [];
      if (idsToFetch.length > 0) {
        fetchedData = await fetchMultiplePokemon(idsToFetch);
        // Save to cache
        pokemonCache.setPokemonDetails(fetchedData);
      }
      
      // Combine and sort by original order
      const allData = [...cachedData, ...fetchedData];
      const sortedData = ids
        .map(id => allData.find(p => p.id === id))
        .filter((p): p is Pokemon => p !== undefined);

      setDisplayedPokemon(sortedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Pokémon details');
    } finally {
      setIsLoading(false);
    }
  };

  // Load all Pokémon names on first mount
  useEffect(() => {
    loadAllPokemonNames();
  }, []);

  // Run every time searchTerm/currentPage changes
  useEffect(() => {
    loadDisplayedPokemon();
  }, [searchTerm, currentPage, allPokemonList]);

  const retry = () => {
    if (allPokemonList.length === 0) {
      loadAllPokemonNames();
    } else {
      loadDisplayedPokemon();
    }
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return {
    displayedPokemon,
    totalPages,
    isLoading,
    error,
    retry,
  };
}
