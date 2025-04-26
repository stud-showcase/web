import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";
import { ProjectsTable } from "./ProjectsTable";

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Проекты</title>
      </Head>
      <AdminLayout>
        <Heading level={1}>Проекты</Heading>
        <ProjectsTable />
      </AdminLayout>
    </>
  );
}
