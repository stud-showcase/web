import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";

export default function VacanciesPage() {
  return (
    <>
      <Head>
        <title>Вакансии</title>
      </Head>
      <AdminLayout>
        <Heading level={1}>Вакансии</Heading>
      </AdminLayout>
    </>
  );
}
