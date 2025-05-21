import { AdminLayout } from "@/layouts/AdminLayout";

import { Head } from "@inertiajs/react";
import { Heading } from "@/shared/ui/Heading";
import { ApplicationsTable } from "./ApplicationsTable";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { Application } from "@/entities/Application";

type Props = {
  taskRequests: ServerPaginatedData<Application>;
  filters: [];
  availableFilters: [];
};

export default function ApplicationsPage(props: Props) {
  const { taskRequests, availableFilters, filters: appliedFilters } = props;

  return (
    <>
      <Head>
        <title>Заявки</title>
      </Head>
      <AdminLayout>
        <>
          <Heading level={1}>Заявки</Heading>
          <ApplicationsTable applications={taskRequests} />
        </>
      </AdminLayout>
    </>
  );
}
