import { Project, STATUSES } from "@/entities/Project";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { DataTable } from "@/shared/ui/DataTable";
import { columns } from "./columns";
import { useContext } from "react";
import { ProjectsFiltersContext } from "../context/ProjectsFiltersContext";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { sendProjectsFilters } from "../util/sendProjectsFilters";
import { defaultProjectFilters } from "../consts/defaultProjectFilters";
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

export function ProjectsTable({
  projects,
}: {
  projects: ServerPaginatedData<Project>;
}) {
  const { filters, setFilters } = useContext(ProjectsFiltersContext);

  const debouncedSendFilters = useDebounce(sendProjectsFilters, 500);

  const handleSearch = (value: string) => {
    const newFilters = { ...filters, search: value || undefined };
    setFilters(newFilters);
    debouncedSendFilters(newFilters);
  };

  const handleFiltersApply = () => {
    sendProjectsFilters(filters);
  };

  const handleFiltersReset = () => {
    setFilters(defaultProjectFilters);
    sendProjectsFilters(defaultProjectFilters);
  };

  return (
    <DataTable
      data={projects}
      columns={columns}
      route="/admin/projects"
      search={filters.search ?? ""}
      filtersSlot={<Filters />}
      onSearch={handleSearch}
      onFiltersApply={handleFiltersApply}
      onFiltersReset={handleFiltersReset}
    />
  );
}
