import { ProjectCard } from "./ProjectCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { ExtendedProject } from "../model/ExtendedProject";
import { useAuth } from "@/shared/hooks/useAuth";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { Text } from "@/shared/ui/Text";
import { DataPagination } from "@/shared/ui/DataPagination";
import { SearchBar } from "@/shared/ui/SearchBar";
import { useContext } from "react";
import { sendProjectsFilters } from "../util/sendProjectsFilters";
import { ProjectsFiltersContext } from "../context/ProjectsFiltersContext";
import { defaultProjectsFilters } from "../consts/defaultProjectsFilters";
import { getCurrentTab } from "../util/getCurrentTab";

function NoProjectsText() {
  return <Text variant="large">Не было найдено проектов</Text>;
}

function ProjectsCards({
  projects,
}: {
  projects: ServerPaginatedData<ExtendedProject>;
}) {
  return (
    <div className="mt-6">
      {projects.data.length === 0 ? (
        <NoProjectsText />
      ) : (
        <div className="flex flex-col gap-6">
          {projects.data.map((project) => (
            <ProjectCard
              project={project}
              task={project.task}
              key={project.id}
            />
          ))}
        </div>
      )}
      <DataPagination paginatedData={projects} className="mt-6" />
    </div>
  );
}

export function ProjectsPageContent({
  projects,
}: {
  projects: ServerPaginatedData<ExtendedProject>;
}) {
  const { user } = useAuth();
  const { filters, setFilters } = useContext(ProjectsFiltersContext);

  const handleSearch = () => {
    sendProjectsFilters(filters);
  };

  const handleChange = (value: string) => {
    setFilters({ ...filters, search: value });
  };

  const handleTabChange = (value: string) => {
    const clearedFilters = {
      ...defaultProjectsFilters,
    };
    setFilters(clearedFilters);
    sendProjectsFilters(clearedFilters, value as "my" | "all");
  };

  if (user) {
    return (
      <Tabs
        defaultValue={getCurrentTab()}
        onValueChange={handleTabChange}
      >
        <div className="flex lg:flex-row flex-col gap-4">
          <TabsList className="w-fit">
            <TabsTrigger value="all">Все проекты</TabsTrigger>
            <TabsTrigger value="my">Мои проекты</TabsTrigger>
          </TabsList>
          <SearchBar
            value={filters.search ?? ""}
            onSearch={handleSearch}
            onChange={handleChange}
          />
        </div>
        <TabsContent value="all">
          <ProjectsCards projects={projects} />
        </TabsContent>
        <TabsContent value="my">
          <ProjectsCards projects={projects} />
        </TabsContent>
      </Tabs>
    );
  }

  return (
    <div>
      <SearchBar
        value={filters.search ?? ""}
        onSearch={handleSearch}
        onChange={handleChange}
      />
      <ProjectsCards projects={projects} />
    </div>
  );
}
