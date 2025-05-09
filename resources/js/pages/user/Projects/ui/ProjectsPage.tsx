import { UserLayout } from "@/layouts/UserLayout";
import { Head, usePage } from "@inertiajs/react";
import { ProjectsPageFilterPanel } from "./ProjectsPageFilterPanel";
import { ProjectsPageContent } from "./ProjectsPageContent";
import { ExtendedProject } from "../model/ExtendedProject";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { TaskTag } from "@/entities/Task";
import { ProjectsFilters } from "../model/ProjectsFilters";
import { useState } from "react";
import { defaultProjectsFilters } from "../consts/defaultProjectsFilters";
import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";
import { ProjectsFiltersContext } from "../context/ProjectsFiltersContext";

type Props = {
  projects: ServerPaginatedData<ExtendedProject>;
  userProjects: ServerPaginatedData<ExtendedProject>;
  availableFilters: { tags: TaskTag[] };
  filters: ProjectsFilters;
};

export default function ProjectsPage(props: Props) {
  const { projects, availableFilters, filters: appliedFilters } = props;

  const [filters, setFilters] = useState<ProjectsFilters>({
    ...defaultProjectsFilters,
    ...appliedFilters,
    myProjects: window.location.pathname === "/myProjects" ? true : false,
  });

  console.log(filters);

  return (
    <>
      <Head>
        <title>Проекты</title>
      </Head>
      <UserLayout>
        <ProjectsFiltersContext.Provider value={{ filters, setFilters }}>
          <FiltersItemsLayout
            heading="Проекты"
            filtersSlot={
              <ProjectsPageFilterPanel tags={availableFilters.tags} />
            }
            contentSlot={<ProjectsPageContent projects={projects} />}
          />
        </ProjectsFiltersContext.Provider>
      </UserLayout>
    </>
  );
}
