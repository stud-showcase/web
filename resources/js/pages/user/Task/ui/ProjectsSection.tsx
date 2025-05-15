import { Heading } from "@/shared/ui/Heading";
import { SimpleProjectCard } from "./SimpleProjectCard";
import { Project } from "@/entities/Project";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return;

  return (
    <section className="mt-10">
      <Heading level={3}>Проекты</Heading>
      <ul className="space-y-3 mt-4">
        {projects.map((project) => (
          <li key={project.id}>
            <SimpleProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
