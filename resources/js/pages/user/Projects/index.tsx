import { SearchBar } from "@/features/SearchBar";
import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { ProjectsFilterPanel } from "./ui/ProjectsFilterPanel";
import { CardListWrapper } from "@/features/CardListWrapper";
import { mockProjects } from "./mocks";
import { ProjectCard } from "./ui/ProjectCartd";

function ProjectList() {
  return (
    <CardListWrapper>
      {mockProjects.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </CardListWrapper>
  );
}

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
