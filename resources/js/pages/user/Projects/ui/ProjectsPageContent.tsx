import { SearchBar } from "@/shared/ui/SearchBar";
import { ProjectCard } from "./ProjectCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { ExtendedProject } from "../model/ExtendedProject";
import { useAuth } from "@/shared/hooks/useAuth";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { Text } from "@/shared/ui/Text";
import { DataPagination } from "@/shared/ui/DataPagination";

function ProjectsCards({ projects }: { projects: ExtendedProject[] }) {
  return (
    <div className="grid mt-6 lg:grid-cols-2 grid-cols-1 gap-6">
      {projects.map((project) => (
        <ProjectCard project={project} task={project.task} key={project.id} />
      ))}
    </div>
  );
}

function NoProjectsText() {
  return <Text variant="large" className="mt-6">Нет проектов</Text>;
}

export function ProjectsPageContent({
  projects,
  userProjects,
}: {
  projects: ServerPaginatedData<ExtendedProject>;
  userProjects: ServerPaginatedData<ExtendedProject>;
}) {
  const { user } = useAuth();

  if (user) {
    <Tabs defaultValue="all" className="flex flex-col gap-6">
      <div className="flex lg:flex-row flex-col gap-4">
        <TabsList className="w-fit">
          <TabsTrigger value="all">Все проекты</TabsTrigger>
          <TabsTrigger value="my">Мои проекты</TabsTrigger>
        </TabsList>
        <SearchBar />
      </div>
      <TabsContent value="all">
        <ProjectsCards projects={projects.data} />
      </TabsContent>
      <TabsContent value="my">
        {userProjects.data.length === 0 ? (
          <NoProjectsText />
        ) : (
          <ProjectsCards projects={userProjects.data} />
        )}
      </TabsContent>
    </Tabs>;
  }

  return (
    <>
      <SearchBar />
      {projects.data.length === 0 ? (
        <NoProjectsText />
      ) : (
        <>
          <ProjectsCards projects={projects.data} />
          <DataPagination paginatedData={projects} className="mt-6" />
        </>
      )}
    </>
  );
}
