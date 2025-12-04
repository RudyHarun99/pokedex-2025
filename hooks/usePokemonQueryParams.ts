"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export function usePokemonQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchTerm = searchParams.get("search") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchParamsString = searchParams.toString();

  const handleSearchChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParamsString);

      if (value.trim()) params.set("search", value);
      else params.delete("search");

      params.set("page", "1");

      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParamsString] // ini aman
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));

      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParamsString]
  );

  return {
    searchTerm,
    currentPage,
    handleSearchChange,
    handlePageChange,
  };
}
