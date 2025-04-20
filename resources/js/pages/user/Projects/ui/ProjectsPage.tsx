import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { ProjectsPageFilterPanel } from "./ProjectsPageFilterPanel";
import { ProjectsPageContent } from "./ProjectsPageContent";
import { ExtendedProject } from "../model/ExtendedProject";
import { project, task } from "@/shared/mocks";

export default function ProjectsPage({}: { projects: ExtendedProject[] }) {
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
