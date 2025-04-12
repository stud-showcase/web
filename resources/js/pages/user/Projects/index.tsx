import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { ProjectsPageFilterPanel } from "./ui/ProjectsPageFilterPanel";
import { ProjectsPageContent } from "./ui/ProjectsPageContent";
import { FullProject } from "./types/FullProject";
import { project, task } from "@/shared/mocks";

export default function ProjectsPage({}: { projects: FullProject[] }) {
  const projects = Array(10).fill({ project, task });

  return (
    <>
      <Head>
        <title>Проекты</title>
      </Head>
      <UserLayout>
        <FiltersItemsLayout
          heading="Проекты"
          filterPanel={<ProjectsPageFilterPanel />}
          content={<ProjectsPageContent projects={projects} />}
        />
      </UserLayout>
    </>
  );
}
