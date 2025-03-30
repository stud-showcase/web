import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { ProjectsPageFilterPanel } from "./ui/ProjectsPageFilterPanel";
import { ProjectsPageContent } from "./ui/ProjectsPageContent";

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Проекты</title>
      </Head>
      <UserLayout>
        <FiltersItemsLayout
          heading="Проекты"
          filterPanel={<ProjectsPageFilterPanel />}
          content={<ProjectsPageContent />}
        />
      </UserLayout>
    </>
  );
}
