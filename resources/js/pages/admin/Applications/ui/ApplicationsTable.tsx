import { Application } from "@/entities/Application";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { DataTable } from "@/shared/ui/DataTable";
import { MultiSelect } from "@/shared/ui/MultiSelect";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import { useContext } from "react";
import { ApplicationsFiltersContext } from "../context/ApplicationsFiltersContext";
import { columns } from "./columns";
import { getCurrentTab } from "../util/getCurrentTab";
import { tabToUrl } from "../consts/tabToUrl";

function Filters({ customers }: { customers: string[] }) {
  const { filters, setFilters } = useContext(ApplicationsFiltersContext);

  const options = customers.map((customer) => ({
    label: customer,
    value: customer,
  }));

  return (
    <>
      <MultiSelect
        id="customers"
        options={options}
        defaultValue={filters.customers}
        onValueChange={(value) => setFilters({ ...filters, customers: value })}
        placeholder="Выберите заказчика..."
        maxCount={1}
      />
      <Select
        value={filters.withProject}
        onValueChange={(value) =>
          setFilters({ ...filters, withProject: value })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Выберите тип заявки..." />
        </SelectTrigger>
        <SelectContent id="type">
          <SelectGroup>
            <SelectLabel>Тип заявки</SelectLabel>
            <SelectItem value="0">Банк задач</SelectItem>
            <SelectItem value="1">Проект</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export function ApplicationsTable({
  applications,
  customers,
  handleSearch,
  handleFiltersApply,
  handleFiltersReset,
}: {
  applications: ServerPaginatedData<Application>;
  customers: string[];
  handleSearch: (route: string, value: string) => void;
  handleFiltersApply: (route: string) => void;
  handleFiltersReset: (route: string) => void;
}) {
  const { filters } = useContext(ApplicationsFiltersContext);
  const route = tabToUrl[getCurrentTab()];

  return (
    <DataTable
      data={applications}
      columns={columns}
      rowRoute={'/admin/applications'}
      search={filters.search ?? ""}
      onSearch={(value) => handleSearch(route, value)}
      onFiltersApply={() => handleFiltersApply(route)}
      onFiltersReset={() => handleFiltersReset(route)}
      filtersSlot={<Filters customers={customers} />}
    />
  );
}
