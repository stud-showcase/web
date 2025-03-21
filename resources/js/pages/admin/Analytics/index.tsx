import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";

export default function AnalyticsPage() {
  return (
    <>
      <Head>
        <title>Аналитика</title>
      </Head>
      <AdminLayout>
        <Heading level={1}>Аналитика</Heading>
      </AdminLayout>
    </>
  );
}
