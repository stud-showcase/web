import { STATUSES } from "@/entities/Project";
import { COMPLEXITIES, TaskTag } from "@/entities/Task";
import {
  FilterPanel,
  FilterBlock,
  RadioFilterBlock,
} from "@/shared/ui/FilterPanel";
import { router } from "@inertiajs/react";
import { useState } from "react";

type Filters = {
  status: string[];
  complexity: string[];
  tags: string[];
  isHiring: string;
};

export function ProjectsPageFilterPanel({
  tags,
  appliedFilters,
}: {
  tags: TaskTag[];
  appliedFilters: Filters | undefined;
}) {
  const [filters, setFilters] = useState<Filters>({
    status: appliedFilters?.status || [],
    complexity: appliedFilters?.complexity || [],
    tags: appliedFilters?.tags || [],
    isHiring: appliedFilters?.isHiring || "",
  });

  const handleApply = () => {
    router.get(`/projects`, filters, {
      preserveState: true,
      replace: true,
    });
  };

  const handleReset = () => {
    setFilters({ status: [], complexity: [], tags: [], isHiring: "" });
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
