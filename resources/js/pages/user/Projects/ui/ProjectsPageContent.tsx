import { SearchBar } from "@/shared/components/SearchBar";
import { ProjectCard } from "@/entities/Project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { FullProject } from "../types/FullProject";

export function ProjectsPageContent({ projects }: { projects: FullProject[] }) {
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
        <div className="grid grid-cols-1 gap-6">
          {projects.map(({ project, task }) => (
            <ProjectCard project={project} task={task} key={project.id} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="my">
        <div className="grid grid-cols-1 gap-6">
          {projects.map(({ project, task }) => (
            <ProjectCard project={project} task={task} key={project.id} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
