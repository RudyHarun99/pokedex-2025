"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

export function usePokemonQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Ambil value dari URL tapi memoized
  const rawSearch = useMemo(() =>
    searchParams.get("search") || "",
    [searchParams]
  );
  const rawPage = useMemo(() =>
    Number(searchParams.get("page")) || 1,
    [searchParams]
  );

  // State internal
  const [searchTerm, setSearchTerm] = useState(rawSearch);
  const [currentPage, setCurrentPage] = useState(rawPage);

  // Sync URL → State (hanya ketika URL benar-benar berubah)
  useEffect(() => {
    setSearchTerm(rawSearch);
    setCurrentPage(rawPage);
  }, [rawSearch, rawPage]);

  // Handle Search
  const handleSearchChange = useCallback((value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) params.set("search", value);
      else params.delete("search");

      params.set("page", "1");

      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  // Handle Pagination
  const handlePageChange = useCallback((page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  return {
    searchTerm,
    currentPage,
    handleSearchChange,
    handlePageChange,
  };
}
