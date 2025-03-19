import { ProjectCard } from "./ProjectCartd";
import { Pagination } from "./Pagination";
import { mockProjects } from "../mocks";

export function ProjectList() {
  return (
    <div className="lg:col-span-3">
      <div className="grid grid-cols-1 gap-6">
        {mockProjects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}
