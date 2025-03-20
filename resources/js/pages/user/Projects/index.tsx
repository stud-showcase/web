import { SearchBar } from "@/features/SearchBar";
import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { ProjectList } from "./ui/ProjectList";
import { ProjectsFilterPanel } from "./ui/ProjectsFilterPanel";

export default function Projects() {
  return (
    <>
      <Head>
        <title>Проекты</title>
      </Head>
      <UserLayout>
        <FiltersItemsLayout
          heading="Проекты"
          searchBar={<SearchBar />}
          filterPanel={<ProjectsFilterPanel />}
          items={<ProjectList />}
        />
      </UserLayout>
    </>
  );
}
