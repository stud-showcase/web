import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";
import { ProjectsTable } from "./ProjectsTable";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { Project } from "@/entities/Project";

type Props = {
  projects: ServerPaginatedData<Project>;
  filters: any;
  availableFilters: any;
};

export default function ProjectsPage(props: Props) {
  const { projects, availableFilters, filters: appliedFilters } = props;
  console.log(projects);

  return (
    <>
      <Head>
        <title>Проекты</title>
      </Head>
      <AdminLayout>
        <Heading level={1}>Проекты</Heading>
        <ProjectsTable projects={projects} />
      </AdminLayout>
    </>
  );
}
