import { AdminLayout } from "@/layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { RequestsTable } from "./ui/RequestsTable";
import { Heading } from "@/shared/ui/Heading";

export default function RequestsPage() {
  return (
    <>
      <Head>
        <title>Заявки</title>
      </Head>
      <AdminLayout>
        <>
          <Heading level={1}>Заявки</Heading>
          <RequestsTable />
        </>
      </AdminLayout>
    </>
  );
}
