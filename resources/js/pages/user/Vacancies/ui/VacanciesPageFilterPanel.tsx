import { TaskTag } from "@/entities/Task";
import { FilterBlock, FilterPanel } from "@/shared/ui/FilterPanel";
import { useContext } from "react";
import { VacanciesFiltersContext } from "../context/VacanciesFiltersContext";
import { sendVacanciesFilters } from "../util/sendVacanciesFilters";
import { defaultVacanciesFilters } from "../consts/defaultVacanciesFilters";

export function VacanciesPageFilterPanel({ tags }: { tags: TaskTag[] }) {
  const { filters, setFilters } = useContext(VacanciesFiltersContext);

  const handleApply = () => {
    sendVacanciesFilters(filters);
  };

  const handleReset = () => {
    const clearedFilters = {
      ...defaultVacanciesFilters,
      search: filters.search,
    };
    setFilters(clearedFilters);
    sendVacanciesFilters(clearedFilters);
  };

  return (
    <FilterPanel onApply={handleApply} onReset={handleReset}>
      <FilterBlock
        title="Теги"
        idPrefix="tag"
        options={tags}
        values={filters.tags}
        onChange={(tags) => setFilters({ ...filters, tags })}
        scrollable
      />
    </FilterPanel>
  );
}
