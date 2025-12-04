'use client';

import { useEffect, useState } from 'react';

export const useSearchLocalValue = (
  value: string,
  onChange: (value: string) => void,
) => {
  const [localValue, setLocalValue] = useState(value);

  // Debounce the onChange callback (300ms)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localValue, onChange]);

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return {
    localValue,
    setLocalValue,
    handleClear,
  };
}