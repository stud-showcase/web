import { FilterBlock, FilterPanel } from "@/shared/ui/FilterPanel";
import { useContext } from "react";
import { TaskBankFiltersContext } from "../context/TaskBankFiltersContext";
import { sendTaskBankFilters } from "../util/sendTaskBankFilters";
import { defaultTaskBankFilters } from "../consts/defaultTaskBankFilters";
import { COMPLEXITIES, TaskTag } from "@/entities/Task";

export function TasksBankPageFilterPanel({
  tags,
  customers,
}: {
  tags: TaskTag[];
  customers: string[];
}) {
  const { filters, setFilters } = useContext(TaskBankFiltersContext);

  const handleApply = () => {
    sendTaskBankFilters(filters);
  };

  const handleReset = () => {
    const clearedFilters = {
      ...defaultTaskBankFilters,
      search: filters.search,
    };
    setFilters(clearedFilters);
    sendTaskBankFilters(clearedFilters);
  };

  return (
    <FilterPanel onApply={handleApply} onReset={handleReset}>
      <FilterBlock
        title="Сложность"
        options={COMPLEXITIES}
        idPrefix="complexity"
        values={filters.complexity}
        onChange={(complexity) => setFilters({ ...filters, complexity })}
      />
      {customers.length != 0 && (
        <FilterBlock
          title="Заказчики"
          idPrefix="customer"
          options={customers.map((customer) => ({
            id: customer,
            name: customer,
          }))}
          values={filters.customers}
          onChange={(customers) => setFilters({ ...filters, customers })}
          scrollable
        />
      )}
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
