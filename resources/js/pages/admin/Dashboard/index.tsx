import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Дашборд</title>
      </Head>
      <AdminLayout>
        <Heading level={1}>Дашборд</Heading>
      </AdminLayout>
    </>
  );
}
