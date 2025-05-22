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
import { useDebounce } from "@/shared/hooks/useDebounce";
import { sendApplicationsFilters } from "../util/sendApplicationsFilters";
import { ApplicationsFiltersContext } from "../context/ApplicationsFiltersContext";
import { defaultApplicationsFilters } from "../consts/defaultApplicationsFilters";
import { columns } from "./columns";

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
}: {
  applications: ServerPaginatedData<Application>;
  customers: string[];
}) {
  const { filters, setFilters } = useContext(ApplicationsFiltersContext);

  const debouncedSendFilters = useDebounce(sendApplicationsFilters, 500);

  const handleSearch = (value: string) => {
    const newFilters = { ...filters, search: value || undefined };
    setFilters(newFilters);
    debouncedSendFilters(newFilters);
  };

  const handleFiltersApply = () => {
    sendApplicationsFilters(filters);
  };

  const handleFiltersReset = () => {
    setFilters(defaultApplicationsFilters);
    sendApplicationsFilters(defaultApplicationsFilters);
  };

  return (
    <DataTable
      data={applications}
      columns={columns}
      route="/admin/applications"
      search={filters.search ?? ""}
      onSearch={handleSearch}
      onFiltersApply={handleFiltersApply}
      onFiltersReset={handleFiltersReset}
      filtersSlot={<Filters customers={customers} />}
    />
  );
}
