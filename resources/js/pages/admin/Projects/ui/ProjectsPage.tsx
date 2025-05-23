import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";
import { ProjectsTable } from "./ProjectsTable";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { Project } from "@/entities/Project";
import { ProjectsFilters } from "../model/ProjectsFilters";
import { useState } from "react";
import { defaultProjectFilters } from "../consts/defaultProjectFilters";
import { ProjectsFiltersContext } from "../context/ProjectsFiltersContext";

type Props = {
  projects: ServerPaginatedData<Project>;
  filters: ProjectsFilters;
};

export default function ProjectsPage(props: Props) {
  const { projects, filters: appliedFilters } = props;

  const [filters, setFilters] = useState<ProjectsFilters>({
    ...defaultProjectFilters,
    ...appliedFilters,
  });

  console.log(projects);

  return (
    <>
      <Head>
        <title>Проекты</title>
      </Head>
      <AdminLayout>
        <Heading level={1}>Проекты</Heading>
        <ProjectsFiltersContext.Provider value={{ filters, setFilters }}>
          <ProjectsTable projects={projects} />
        </ProjectsFiltersContext.Provider>
      </AdminLayout>
    </>
  );
}
