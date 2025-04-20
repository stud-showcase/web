import { SearchBar } from "@/shared/ui/SearchBar";
import { ProjectCard } from "./ProjectCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { ExtendedProject } from "../model/ExtendedProject";


export function ProjectsPageContent({ projects }: { projects: ExtendedProject[] }) {
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
