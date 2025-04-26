import { AdminLayout } from "@/layouts/AdminLayout";

import { Head } from "@inertiajs/react";
import { Heading } from "@/shared/ui/Heading";
import { ApplicationsTable } from "./ApplicationsTable";


export default function ApplicationsPage() {
  return (
    <>
      <Head>
        <title>Заявки</title>
      </Head>
      <AdminLayout>
        <>
          <Heading level={1}>Заявки</Heading>
          <ApplicationsTable />
        </>
      </AdminLayout>
    </>
  );
}
