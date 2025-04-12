import { UserLayout } from "@/layouts/UserLayout";
import { Heading } from "@/shared/ui/Heading";
import { Container } from "@/shared/ui/Container";
import { Head, Link } from "@inertiajs/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui/Breadcrumb";
import { ComplexityBadge, Task } from "@/entities/Task";
import { Project, StatusBadge } from "@/entities/Project";
import { HiringBadge } from "@/entities/Project/ui/HiringBadge";
import { TaskTag } from "@/entities/Task";
import { Vacancy } from "@/entities/Vacancy";
import { project, task } from "@/shared/mocks";

export default function ProjectPage({}: {
  project: Project;
  task: Task;
  vacancies: Vacancy[];
}) {
  return (
    <>
      <Head>
        <title>{project.name}</title>
      </Head>
      <UserLayout>
        <Container withVerticalPaddings>
          <main>
            <header className="border-b pb-8">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/projects">Проекты</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={`/tasks/${task.id}`}>{task.title}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{project.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="mt-6 flex flex-col sm:flex-row justify-between sm:items-center items-start gap-6">
                <Heading level={1}>{project.name}</Heading>
                <ComplexityBadge complexity={task.complexity} />
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <StatusBadge status={project.status} />
                {project.isHiring && <HiringBadge />}
                {task.tags.map((tag) => (
                  <TaskTag value={tag} />
                ))}
              </div>
            </header>
          </main>
        </Container>
      </UserLayout>
    </>
  );
}
