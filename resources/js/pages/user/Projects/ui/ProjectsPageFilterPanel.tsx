import { STATUSES } from "@/entities/Project";
import { COMPLEXITIES, TaskTag } from "@/entities/Task";
import {
  FilterPanel,
  FilterBlock,
  RadioFilterBlock,
} from "@/shared/ui/FilterPanel";
import { useContext } from "react";
import { ProjectsFiltersContext } from "../context/ProjectsFiltersContext";
import { sendFilters } from "../util/sendFilters";
import { defaultFilters } from "../consts/defaultFilters";

export function ProjectsPageFilterPanel({ tags }: { tags: TaskTag[] }) {
  const { filters, setFilters } = useContext(ProjectsFiltersContext);

  const handleApply = () => {
    sendFilters(filters);
  };

  const handleReset = () => {
    const clearedFilters = {
      ...defaultFilters,
      search: filters.search,
    };
    setFilters(clearedFilters);
    sendFilters(clearedFilters);
  };

  return (
    <FilterPanel onApply={handleApply} onReset={handleReset}>
      <FilterBlock
        title="Статус"
        options={STATUSES}
        idPrefix="status"
        values={filters.status}
        onChange={(status) => setFilters({ ...filters, status })}
      />
      <FilterBlock
        title="Сложность"
        options={COMPLEXITIES}
        idPrefix="complexity"
        values={filters.complexity}
        onChange={(complexity) => setFilters({ ...filters, complexity })}
      />
      <RadioFilterBlock
        title="Набор в команду"
        options={["Закрыт", "Открыт"]}
        idPrefix="recruitment"
        value={filters.isHiring}
        onChange={(isHiring) => {
          setFilters({ ...filters, isHiring });
        }}
      />
      {tags.length != 0 && (
        <FilterBlock
          title="Теги"
          idPrefix="tag"
          options={tags}
          values={filters.tags}
          onChange={(tags) => setFilters({ ...filters, tags })}
          scrollable
        />
      )}
    </FilterPanel>
  );
}
