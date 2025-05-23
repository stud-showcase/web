import { DataTable } from "@/shared/ui/DataTable";
import { User } from "@/entities/User";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { columns } from "./columns";
import { UsersFiltersContext } from "../context/UsersFiltersContext";
import { useContext } from "react";
import { MultiSelect } from "@/shared/ui/MultiSelect";

function Filters() {
  const { filters, setFilters } = useContext(UsersFiltersContext);

  const rolesOptions = [
    { label: "Студент", value: "student" },
    { label: "Наставник", value: "mentor" },
    { label: "Администратор", value: "admin" },
  ];

  return (
    <>
      <MultiSelect
        id="roles"
        options={rolesOptions}
        defaultValue={filters.roles}
        onValueChange={(value) => setFilters({ ...filters, roles: value })}
        placeholder="Выберите роль пользователя..."
        maxCount={1}
      />
    </>
  );
}

const route = "/admin/users";

export function UsersTable({
  users,
  handleSearch,
  handleFiltersApply,
  handleFiltersReset,
}: {
  users: ServerPaginatedData<User>;
  handleSearch: (route: string, value: string) => void;
  handleFiltersApply: (route: string) => void;
  handleFiltersReset: (route: string) => void;
}) {
  const { filters } = useContext(UsersFiltersContext);

  return (
    <DataTable
      data={users}
      columns={columns}
      rowRoute="/admin/users"
      search={filters.search ?? ""}
      onSearch={(value) => handleSearch(route, value)}
      onFiltersApply={() => handleFiltersApply(route)}
      onFiltersReset={() => handleFiltersReset(route)}
      filtersSlot={<Filters />}
    />
  );
}
