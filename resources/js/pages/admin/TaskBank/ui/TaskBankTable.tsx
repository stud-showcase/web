import { COMPLEXITIES, Task } from "@/entities/Task";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { DataTable } from "@/shared/ui/DataTable";
import { columns } from "./columns";
import { useContext } from "react";
import { TaskBankFiltersContext } from "../context/TaskBankFiltersContext";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { sendTaskBankFilters } from "../util/sendTaskBankFilters";
import { defaultTaskBankFilters } from "../consts/defaultTaskBankFilters";
import { MultiSelect } from "@/shared/ui/MultiSelect";

function Filters({ customers }: { customers: string[] }) {
  const { filters, setFilters } = useContext(TaskBankFiltersContext);

  const complexitiesOptions = COMPLEXITIES.map((complexity) => ({
    label: complexity.name,
    value: complexity.id.toString(),
  }));

  const customersOptions = customers.map((customer) => ({
    label: customer,
    value: customer,
  }));

  return (
    <>
      <MultiSelect
        id="complexities"
        options={complexitiesOptions}
        defaultValue={filters.complexity}
        onValueChange={(value) => setFilters({ ...filters, complexity: value })}
        placeholder="Выберите сложность..."
        maxCount={1}
      />
      <MultiSelect
        id="customers"
        options={customersOptions}
        defaultValue={filters.customers}
        onValueChange={(value) => setFilters({ ...filters, customers: value })}
        placeholder="Выберите заказчика..."
        maxCount={1}
      />
    </>
  );
}

export function TaskBankTable({
  tasks,
  customers,
}: {
  tasks: ServerPaginatedData<Task>;
  customers: string[];
}) {
  const { filters, setFilters } = useContext(TaskBankFiltersContext);

  const debouncedSendFilters = useDebounce(sendTaskBankFilters, 500);

  const handleSearch = (value: string) => {
    const newFilters = { ...filters, search: value || undefined };
    setFilters(newFilters);
    debouncedSendFilters(newFilters);
  };

  const handleFiltersApply = () => {
    sendTaskBankFilters(filters);
  };

  const handleFiltersReset = () => {
    setFilters(defaultTaskBankFilters);
    sendTaskBankFilters(defaultTaskBankFilters);
  };

  return (
    <DataTable
      data={tasks}
      columns={columns}
      route="/admin/tasks"
      search={filters.search ?? ""}
      onSearch={handleSearch}
      onFiltersApply={handleFiltersApply}
      onFiltersReset={handleFiltersReset}
      filtersSlot={<Filters customers={customers} />}
    />
  );
}
