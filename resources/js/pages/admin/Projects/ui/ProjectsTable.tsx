import { Project, STATUSES } from "@/entities/Project";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { DataTable } from "@/shared/ui/DataTable";
import { columns } from "./columns";
import { useContext } from "react";
import { ProjectsFiltersContext } from "../context/ProjectsFiltersContext";
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

function Filters() {
  const { filters, setFilters } = useContext(ProjectsFiltersContext);

  const statusesOptions = STATUSES.map((status) => ({
    label: status.name,
    value: status.id.toString(),
  }));

  return (
    <>
      <MultiSelect
        id="statuses"
        options={statusesOptions}
        defaultValue={filters.status}
        onValueChange={(value) => setFilters({ ...filters, status: value })}
        placeholder="Выберите статус проекта..."
        maxCount={1}
      />
      <Select
        value={filters.isHiring}
        onValueChange={(value) => setFilters({ ...filters, isHiring: value })}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Выберите статус набора..." />
        </SelectTrigger>
        <SelectContent id="type">
          <SelectGroup>
            <SelectLabel>Набор в проект</SelectLabel>
            <SelectItem value="0">Закрыт</SelectItem>
            <SelectItem value="1">Открыт</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

const route = "/admin/projects";

export function ProjectsTable({
  projects,
  handleSearch,
  handleFiltersApply,
  handleFiltersReset,
}: {
  projects: ServerPaginatedData<Project>;
  handleSearch: (route: string, value: string) => void;
  handleFiltersApply: (route: string) => void;
  handleFiltersReset: (route: string) => void;
}) {
  const { filters } = useContext(ProjectsFiltersContext);

  return (
    <DataTable
      data={projects}
      columns={columns}
      rowRoute={route}
      search={filters.search ?? ""}
      filtersSlot={<Filters />}
      onSearch={(value) => handleSearch(route, value)}
      onFiltersApply={() => handleFiltersApply(route)}
      onFiltersReset={() => handleFiltersReset(route)}
    />
  );
}
