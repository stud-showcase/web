import { SearchBar } from "@/features/SearchBar";
import { mockProjects } from "../mocks";
import { ProjectCard } from "./ProjectCartd";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";

export function ProjectsPageContent() {
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
          {mockProjects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="my">
        <div className="grid grid-cols-1 gap-6">
          {mockProjects
            .filter((project) => project.isHiring)
            .map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
