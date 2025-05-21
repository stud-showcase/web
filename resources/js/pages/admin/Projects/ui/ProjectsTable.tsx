import {
  Project,
  ProjectHiringBadge,
  ProjectStatusBadge,
} from "@/entities/Project";
import { getFullName } from "@/entities/User";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { DataTable } from "@/shared/ui/DataTable";

const columns = [
  { title: "ID", cell: (project: Project) => project.id },
  { title: "Название", cell: (project: Project) => project.name },
  {
    title: "Наставник",
    cell: (project: Project) => {
      const { mentor } = project;
      if (!mentor) return "-";
      return getFullName(mentor.firstName, mentor.secondName, mentor.lastName);
    },
  },
  {
    title: "Статус",
    cell: (project: Project) => <ProjectStatusBadge status={project.status} />,
  },
  {
    title: "Набор в команду",
    cell: (project: Project) => (
      <ProjectHiringBadge isHiring={project.isHiring} />
    ),
  },
];

export function ProjectsTable({
  projects,
}: {
  projects: ServerPaginatedData<Project>;
}) {
  return (
    <DataTable data={projects} columns={columns} />
  );
}
