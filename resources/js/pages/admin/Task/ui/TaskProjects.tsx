import {
  Project,
  ProjectHiringBadge,
  ProjectStatusBadge,
} from "@/entities/Project";
import { getFullName } from "@/entities/User";
import { Heading } from "@/shared/ui/Heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/Table";
import { Text } from "@/shared/ui/Text";
import { Link } from "@inertiajs/react";
import { CreateProjectModal } from "./CreateProjectModal";

export function TaskProjects({ id, projects }: { id: number, projects: Project[] }) {
  const hasProjects = projects.length > 0;

  return (
    <div className="space-y-4 border p-4 rounded-md shadow-sm bg-background">
      <Heading level={5}>Проекты по задаче</Heading>
      <CreateProjectModal taskId={id} />
      {hasProjects ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Наставник</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Набор в команду</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>
                  {project.mentor
                    ? getFullName(
                        project.mentor.firstName,
                        project.mentor.secondName,
                        project.mentor.lastName
                      )
                    : "-"}
                </TableCell>
                <TableCell>
                  <ProjectStatusBadge status={project.status} />
                </TableCell>
                <TableCell>
                  <ProjectHiringBadge isHiring={project.isHiring} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link
                      className="text-primary"
                      href={`/admin/projects/${project.id}`}
                    >
                      Перейти
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Text variant="muted" className="mt-4">
          Пока нет проектов
        </Text>
      )}
    </div>
  );
}
