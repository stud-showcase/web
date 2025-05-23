import { useState, useCallback } from "react";
import { router } from "@inertiajs/react";
import { useDebounce } from "@/shared/hooks/useDebounce";

export function useFilters<T extends { search: string | undefined }>(
  defaultFilters: T,
  appliedFilters: Partial<T>
) {
  const [filters, setFilters] = useState<T>({
    ...defaultFilters,
    ...appliedFilters,
  });

  const debouncedSendFilters = useDebounce((route: string, newFilters: T) => {
    router.get(route, newFilters, {
      preserveScroll: true,
      preserveState: true,
    });
  }, 500);

  const handleSearch = useCallback(
    (route: string, value: string) => {
      const newFilters = { ...filters, search: value || undefined };
      setFilters(newFilters);
      debouncedSendFilters(route, newFilters);
    },
    [filters, debouncedSendFilters]
  );

  const handleFiltersApply = useCallback(
    (route: string) => {
      router.get(route, filters, {
        preserveScroll: true,
        preserveState: true,
      });
    },
    [filters, route]
  );

  const handleFiltersReset = useCallback(
    (route: string) => {
      setFilters(defaultFilters);
      router.get(route, defaultFilters, {
        preserveScroll: true,
        preserveState: true,
      });
    },
    [defaultFilters, route]
  );

  return {
    filters,
    setFilters,
    handleSearch,
    handleFiltersApply,
    handleFiltersReset,
  };
}
