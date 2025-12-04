'use client';

import { Pokemon } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const usePokemonCard = (
  pokemon: Pokemon,
) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    router.push(`/pokemon/${pokemon.id}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Use official artwork if available, fallback to front_default sprite
  const imageUrl = imageError
    ? '/placeholder.svg'
    : pokemon.sprites.other['official-artwork'].front_default || 
      pokemon.sprites.front_default;

  return {
    handleClick,
    handleImageError,
    imageUrl,
  }
}