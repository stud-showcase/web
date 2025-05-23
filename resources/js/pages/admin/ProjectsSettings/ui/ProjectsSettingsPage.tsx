import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";

export default function ProjectsSettingsPage() {
  return (
    <>
      <Head>
        <title>Настройки проектов</title>
      </Head>
      <AdminLayout>
        <Heading level={1}>Настройки проектов</Heading>
      </AdminLayout>
    </>
  );
}
