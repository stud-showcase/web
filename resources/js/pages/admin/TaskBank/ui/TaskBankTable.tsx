import { COMPLEXITIES, Task } from "@/entities/Task";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { DataTable } from "@/shared/ui/DataTable";
import { columns } from "./columns";
import { useContext } from "react";
import { TaskBankFiltersContext } from "../context/TaskBankFiltersContext";
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

const route = "/admin/tasks";

export function TaskBankTable({
  tasks,
  customers,
  handleSearch,
  handleFiltersApply,
  handleFiltersReset,
}: {
  tasks: ServerPaginatedData<Task>;
  customers: string[];
  handleSearch: (route: string, value: string) => void;
  handleFiltersApply: (route: string) => void;
  handleFiltersReset: (route: string) => void;
}) {
  const { filters } = useContext(TaskBankFiltersContext);

  return (
    <DataTable
      data={tasks}
      columns={columns}
      rowRoute={route}
      search={filters.search ?? ""}
      onSearch={(value) => handleSearch(route, value)}
      onFiltersApply={() => handleFiltersApply(route)}
      onFiltersReset={() => handleFiltersReset(route)}
      filtersSlot={<Filters customers={customers} />}
    />
  );
}
