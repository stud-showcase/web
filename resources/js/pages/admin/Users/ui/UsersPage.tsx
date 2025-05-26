import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";
import { UsersTable } from "./UsersTable";
import { User } from "@/entities/User";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { useFilters } from "@/shared/hooks/useFilters";
import { UsersFilters } from "../model/UsersFilters";
import { UsersFiltersContext } from "../context/UsersFiltersContext";

type Props = {
  users: ServerPaginatedData<User>;
  filters: UsersFilters;
};

const defaultUsersFilters: UsersFilters = {
  search: undefined,
  roles: [],
};

export default function UsersPage(props: Props) {
  const { users, filters: appliedFilters } = props;

  const {
    filters,
    setFilters,
    handleFiltersApply,
    handleFiltersReset,
    handleSearch,
  } = useFilters<UsersFilters>(defaultUsersFilters, appliedFilters);

  return (
    <>
      <Head>
        <title>Пользователи</title>
      </Head>
      <AdminLayout headerSlot={<Heading level={2}>Пользователи</Heading>}>
        <UsersFiltersContext.Provider value={{ filters, setFilters }}>
          <UsersTable
            users={users}
            handleFiltersApply={handleFiltersApply}
            handleFiltersReset={handleFiltersReset}
            handleSearch={handleSearch}
          />
        </UsersFiltersContext.Provider>
      </AdminLayout>
    </>
  );
}
