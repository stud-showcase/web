import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";
import { UsersTable } from "./UsersTable";
import { User } from "@/entities/User";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";

type Props = {
  users: ServerPaginatedData<User>;
  filters: any;
  availableFilters: any;
};

export default function UsersPage(props: Props) {
  const { users, availableFilters, filters: appliedFilters } = props;
  console.log(users)

  return (
    <>
      <Head>
        <title>Пользователи</title>
      </Head>
      <AdminLayout>
        <Heading level={1}>Пользователи</Heading>
        <UsersTable users={users} />
      </AdminLayout>
    </>
  );
}
