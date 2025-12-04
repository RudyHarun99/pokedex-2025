"use client";

import { useEffect, useState } from "react";

export const useSearchLocalValue = (
  value: string,
  onChange: (value: string) => void,
) => {
  const [localValue, setLocalValue] = useState(value);

  // Debounce, tapi hanya trigger jika localValue !== value (prevent reset)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localValue, value, onChange]);

  // Sync external change (misal URL berubah)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };

  return {
    localValue,
    setLocalValue,
    handleClear,
  };
};
