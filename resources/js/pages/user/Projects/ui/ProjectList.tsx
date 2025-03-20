import { CardListWrapper } from "@/features/CardListWrapper";
import { mockProjects } from "../mocks";
import { ProjectCard } from "./ProjectCartd";

export function ProjectList() {
  return (
    <CardListWrapper>
      {mockProjects.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </CardListWrapper>
  );
}
