import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head, Link } from "@inertiajs/react";
import { ProjectsTable } from "./ProjectsTable";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { Project } from "@/entities/Project";
import { ProjectsFilters } from "../model/ProjectsFilters";
import { ProjectsFiltersContext } from "../context/ProjectsFiltersContext";
import { useFilters } from "@/shared/hooks/useFilters";
import { Button } from "@/shared/ui/Button";
import { Settings } from "lucide-react";

type Props = {
  projects: ServerPaginatedData<Project>;
  filters: ProjectsFilters;
};

const defaultProjectsFilters: ProjectsFilters = {
  search: undefined,
  isHiring: undefined,
  status: [],
};

export default function ProjectsPage(props: Props) {
  const { projects, filters: appliedFilters } = props;

  const {
    filters,
    setFilters,
    handleFiltersApply,
    handleFiltersReset,
    handleSearch,
  } = useFilters<ProjectsFilters>(defaultProjectsFilters, appliedFilters);

  return (
    <>
      <Head>
        <title>Проекты</title>
      </Head>
      <AdminLayout headerSlot={<Heading level={2}>Проекты</Heading>}>
        <div className="flex gap-2 justify-between items-center">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/projects/settings">
              <Settings />
              Настройки
            </Link>
          </Button>
        </div>
        <ProjectsFiltersContext.Provider value={{ filters, setFilters }}>
          <ProjectsTable
            projects={projects}
            handleFiltersApply={handleFiltersApply}
            handleFiltersReset={handleFiltersReset}
            handleSearch={handleSearch}
          />
        </ProjectsFiltersContext.Provider>
      </AdminLayout>
    </>
  );
}
