import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";

export default function RequestsPage() {
  return (
    <>
      <Head>
        <title>Заявки</title>
      </Head>
      <AdminLayout>
        <Heading level={1}>Заявки</Heading>
      </AdminLayout>
    </>
  );
}
