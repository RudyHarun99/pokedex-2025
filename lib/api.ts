// PokéAPI client functions with error handling

import { Pokemon, PokemonListResponse } from './types';

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Error handling wrapper for API calls
 * Throws descriptive errors for different failure scenarios
 */
async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Pokémon not found');
    }
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  try {
    return await response.json();
  } catch (error) {
    throw new Error('Failed to parse API response');
  }
}

/**
 * Fetch a paginated list of Pokémon
 * @param limit - Number of Pokémon to fetch (default: 20)
 * @param offset - Starting position in the list (default: 0)
 * @returns Promise with PokemonListResponse containing list metadata and results
 */
export async function fetchPokemonList(
  limit: number = 20,
  offset: number = 0
): Promise<PokemonListResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );
    return await handleApiResponse<PokemonListResponse>(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch Pokémon list');
  }
}

/**
 * Fetch detailed information for a specific Pokémon
 * @param id - Pokémon ID or name
 * @returns Promise with complete Pokemon data
 */
export async function fetchPokemonDetails(
  id: number | string
): Promise<Pokemon> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);
    return await handleApiResponse<Pokemon>(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to fetch Pokémon details for ID: ${id}`);
  }
}

/**
 * Fetch multiple Pokémon details in parallel
 * @param ids - Array of Pokémon IDs to fetch
 * @returns Promise with array of Pokemon data
 */
export async function fetchMultiplePokemon(
  ids: (number | string)[]
): Promise<Pokemon[]> {
  try {
    const promises = ids.map(id => fetchPokemonDetails(id));
    return await Promise.all(promises);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch multiple Pokémon');
  }
}
