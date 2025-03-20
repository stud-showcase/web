import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { SearchBar } from "./ui/SearchBar";
import { FilterPanel } from "./ui/FilterPanel";
import { ProjectList } from "./ui/ProjectList";
import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";

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
          filterPanel={<FilterPanel />}
          cards={<ProjectList />}
        />
      </UserLayout>
    </>
  );
}
