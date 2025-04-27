import { SearchBar } from "@/shared/ui/SearchBar";
import { ProjectCard } from "./ProjectCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { ExtendedProject } from "../model/ExtendedProject";
import { useAuth } from "@/shared/hooks/useAuth";

export function ProjectsPageContent({
  projects,
}: {
  projects: ExtendedProject[];
}) {
  const { user } = useAuth();

  if (user) {
    return (
      <Tabs defaultValue="all" className="flex flex-col gap-6">
        <div className="flex lg:flex-row flex-col gap-4">
          <TabsList className="w-fit">
            <TabsTrigger value="all">Все проекты</TabsTrigger>
            <TabsTrigger value="my">Мои проекты</TabsTrigger>
          </TabsList>
          <SearchBar />
        </div>
        <TabsContent value="all">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            {projects.map(({ project, task }) => (
              <ProjectCard project={project} task={task} key={project.id} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="my">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            {projects.map(({ project, task }) => (
              <ProjectCard project={project} task={task} key={project.id} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    );
  }

  return (
    <>
      <SearchBar />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map(({ task, project }) => (
          <ProjectCard task={task} project={project} key={project.id} />
        ))}
      </div>
    </>
  );
}
